import profileHeroImg from '../../assets/profileHeroImg.jpg'
import { fetchSingleProfile } from '../../store/modules/profileSlice'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VenueCards from '../VenueCards';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../store/modules/venuesSlice';
import { useFormik } from "formik"
import * as Yup from 'yup'

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
      window.location.href = '/profile';
    })
    .catch(error => {
        console.error(error)
    })
    }
  })

  function displayAvatarInput() {
    document.getElementById('changeAvatarInput').classList.toggle('hidden')
  }

  function displayDeleteOverlay() {
    const deleteOverlay = document.getElementsByClassName('deleteOverlay')
    for(let i = 0; i < deleteOverlay.length; i++) {
      deleteOverlay[i].classList.toggle('hidden')
    }
  }

  function removeDeleteOverlay() {
    const deleteOverlay = document.getElementsByClassName('deleteOverlay')
    for(let i = 0; i < deleteOverlay.length; i++) {
      deleteOverlay[i].classList.add('hidden')
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
        <h1 className='text-2xl mt-4'>My Venues</h1>
        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
        <div className='flex flex-wrap justify-center md:justify-start md:gap-6'>
        {singleProfile.venues.length ? singleProfile.venues.map((venue) => (
          <div key={venue.id} className='relative'>
          <Link to={`/venue/${venue.id}`}>
          <VenueCards media={venue.media[0]} name={venue.name} price={venue.price} location={venue.location.city} rating={venue.rating}/>
          </Link>
          <button onClick={displayDeleteOverlay} className='deleteVenueBtn absolute top-[-0.7rem] left-1/2 md:left-[-0.3rem] hover:scale-110 text-[#125C85]'><FontAwesomeIcon icon={faTrash}/></button>
          <div data-id={venue.id} className='deleteOverlay absolute hidden w-2/3 h-24 bg-[#125C85] top-3 left-[-0.3rem] rounded flex flex-col gap-3 p-4'>
            <h2 className='text-white text-center'>Delete this Venue?</h2>
            <div className='flex w-full justify-between'>
              <button data-id={venue.id} onClick={deleteVenueByID} className='deleteVenueBtn px-2 py-1 rounded bg-red-600 font-semibold text-sm hover:scale-110'>Delete</button>
              <button onClick={removeDeleteOverlay} className='px-2 py-1 rounded bg-green-500 font-semibold text-sm hover:scale-110'>Keep</button>
            </div>
          </div>
          <button className='absolute top-[-0.7rem] right-0 md:right-[-0.3rem] hover:scale-110 text-[#125C85]'><FontAwesomeIcon icon={faEdit}/></button>
          </div>
        )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Venues</p></div>}
        </div>
        <h1 className='text-2xl mt-4'>My Bookings</h1>
        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
        <div className='flex flex-wrap justify-center md:justify-start md:gap-1'>
        {singleProfile.bookings.length ? singleProfile.bookings.map((booking) => (
          <div key={booking.id}>
          <Link to={`/venue/${booking.id}`}>
          <VenueCards media={booking.media[0]} name={booking.name} price={booking.price} location={booking.location.city} rating={booking.rating}/>
          </Link>
          </div>
        )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Bookings</p></div>}
        </div>
        </>}
        
        
        
      </div>
  )
}

export default Profile