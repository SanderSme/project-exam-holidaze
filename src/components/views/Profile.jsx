import profileHeroImg from '../../assets/profileHeroImg.jpg'
import { fetchSingleProfile } from '../../store/modules/profileSlice'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VenueCards from '../VenueCards';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../store/modules/venuesSlice';
import { useFormik } from "formik"
import * as Yup from 'yup'
import { updateLocalStorrage } from '../../utils/Storrage';

const accessToken = localStorage.getItem('accessToken')
// if(!accessToken) {
//   location.href='/login'
// }
const validationSchema = Yup.object().shape({
  avatar: Yup.string()
    .url('Invalid URL')
    .matches(/\.(gif|jpe?g|png)$/i, 'Invalid image URL')
})

const Profile = () => {
  let name = localStorage.getItem('userName')
  const dispatch = useDispatch()
  const {singleProfile} = useSelector(state => state.profile)
  useEffect(() => {
      if(name){
          dispatch(fetchSingleProfile(name))
      }
  }, [dispatch, name])

  const formik = useFormik({
    initialValues: {
      avatar: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        avatar: values.avatar
      }
      console.log(data);
      fetch(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        updateLocalStorrage(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}`)
    })
    .catch(error => {
        console.error(error)
    })
    }
  })

  function displayAvatarInput() {
    document.getElementById('changeAvatarInput').classList.toggle('hidden')
  }

  function toggleVenueOverlay() {
    const venueOverlay = document.getElementsByClassName('venueOverlay')
    for(let i = 0; i < venueOverlay.length; i++) {
      venueOverlay[i].classList.toggle('hidden')
    }
  }

  function deleteVenueByID() {
    const deleteVenueBtn = document.getElementsByClassName('deleteVenueBtn')
    for(let i = 0; i < deleteVenueBtn.length; i++) {
      deleteVenueBtn[i].addEventListener('click', () => {
        const deleteVenueID = deleteVenueBtn[i].dataset.id
        deleteVenue(deleteVenueID)
    })
  }
}

const [activeTab, setActiveTab] = useState("venues")

  return (
      <div className="max-w-7xl w-11/12 mx-auto">
        {singleProfile && <><div className="w-full h-[300px] bg-black rounded-b">
          <img src={profileHeroImg} alt="profile" className='w-full h-full object-cover rounded-b' />
        </div>
        <div className='relative mb-32'>
          <div className='absolute top-[-2rem] left-0 md:left-20 flex items-center gap-4'>
            <div className='h-32 w-32 bg-[#FFC107] flex rounded-full justify-center items-center font-semibold text-3xl border border-black relative'>
              {singleProfile.avatar ? <img src={singleProfile.avatar} alt="profile-pic" className='w-full h-full object-cover rounded-full' /> : singleProfile.name["0"].toUpperCase()}
              
              <button type='button' onClick={displayAvatarInput} className='absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110'>
                <FontAwesomeIcon icon={faCamera} className='text-2xl'/>
              </button>
            </div>
            <form id='changeAvatarInput' onSubmit={formik.handleSubmit} className='w-96 h-8 border p-1 border-black rounded bg-white flex gap-1 items-center hidden'>
              <input type="text" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.avatar || ""} name='avatar' placeholder='Change your avatar' className='w-full'/>
              <button type='submit' className='px-3 rounded bg-[#125C85] text-white'>Change</button>
            </form>
            {formik.touched.avatar && formik.errors.avatar ? <div className='text-red-600'>{formik.errors.avatar}</div> : null}
            <p className='text-2xl'>{singleProfile.name}</p>
          </div>
          
        </div>
        <div className="flex gap-8 items-end">
        <button
          type="button"
          className={`text-xl mt-4 ${
            activeTab === "venues" ? "font-semibold text-black" : "font-normal text-[#00000070]"
          }`}
          onClick={() => setActiveTab("venues")}
        >
          My Venues
        </button>
        <div className="w-[1px] h-8 bg-[#00000050]"></div>
        <button
          type="button"
          className={`text-xl mt-4 ${
            activeTab === "bookings" ? "font-semibold text-black" : "font-normal text-[#00000070]"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
      </div>
        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
        <div className='flex flex-wrap justify-center md:justify-start md:gap-6'>
          {activeTab === "venues" && (
            <>
              {singleProfile.venues.length ? singleProfile.venues.map((venue) => (
                <div key={venue.id} className='relative'>
                  <Link to={`/venue/${venue.id}`}>
                    <VenueCards media={venue.media[0]} name={venue.name} price={venue.price} location={venue.location.city} rating={venue.rating}/>
                  </Link>
                  <button type='button' className='absolute top-0 right-[2px] text-xl text-[#125C85]' onClick={toggleVenueOverlay}><FontAwesomeIcon icon={faEllipsisVertical}/></button>
                  <div className='venueOverlay w-fit h-fit px-6 py-4 bg-[#125C85] absolute rounded top-6 right-0 text-sm text-white hidden'>
                    <p className='mb-4'>Edit venue</p>
                    <button type='button' className='deleteVenueBtn hover:underline' onClick={deleteVenueByID} data-id={venue.id}>Delete venue</button>
                  </div>
                </div>
              )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Venues</p></div>}
            </>
          )}
          {activeTab === "bookings" && (
            <>
              {singleProfile.bookings.length ? singleProfile.bookings.map((booking) => (
                <div key={booking.id}>
                  <Link to={`/venue/${booking.id}`}>
                    <VenueCards media={booking.media[0]} name={booking.name} price={booking.price} location={booking.location.city} rating={booking.rating}/>
                  </Link>
                </div>
              )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Bookings</p></div>}
            </>
          )}
        </div>
      </>} 
    </div>
  )
}

export default Profile