import profileHeroImg from '../../assets/profileHeroImg.jpg'
import { fetchSingleProfile } from '../../store/modules/profileSlice'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VenueCards from '../VenueCards';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../store/modules/venuesSlice';
import { deleteBooking } from '../../store/modules/venuesSlice';
import { useFormik } from "formik"
import * as Yup from 'yup'
import { updateLocalStorrage } from '../../utils/Storrage';
import Error from '../layout/Error'

const accessToken = localStorage.getItem('accessToken')
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

  function toggleVenueOverlay(venueID) {
    const venueOverlay = document.querySelectorAll('.venueOverlay')
    for(let i = 0; i < venueOverlay.length; i++) {
      if(venueOverlay[i].dataset.id === venueID) {
        venueOverlay[i].classList.toggle('hidden')
    }
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

function deleteBookingByID() {
  const deleteBookingBtn = document.getElementsByClassName('deleteBookingBtn')
  for(let i = 0; i < deleteBookingBtn.length; i++) {
    deleteBookingBtn[i].addEventListener('click', () => {
      const deleteBookingID = deleteBookingBtn[i].dataset.id
      deleteBooking(deleteBookingID)
  })
}
}

const venueManager = localStorage.getItem('venueManager')

const [activeTab, setActiveTab] = useState(venueManager === "true" ? "venues" : "bookings")
const {isError} = useSelector(state => state.error);
const {errorMessage} = useSelector(state => state.error);

  return (
      <div className="max-w-7xl w-11/12 mx-auto mt-28">
        {isError ? <Error message={errorMessage}/> : <>{singleProfile && <><div className="w-full h-[200px] md:h-[300px] bg-black rounded-b">
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
            
            <p className='text-2xl'>{singleProfile.name}</p>
          </div>
          <form id='changeAvatarInput' onSubmit={formik.handleSubmit} className='absolute top-28 w-full md:w-96 h-8 border p-1 border-black rounded bg-white flex gap-1 items-center hidden'>
              <input type="text" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.avatar || ""} name='avatar' placeholder='Change your avatar' className='w-full'/>
              <button type='submit' className='px-3 rounded bg-[#125C85] text-white'>Change</button>
            </form>
            {formik.touched.avatar && formik.errors.avatar ? <div className='text-red-600'>{formik.errors.avatar}</div> : null}
        </div>
        <div className="flex gap-8 items-end">
        {venueManager === "true" ? <><button
          type="button"
          className={`text-lg md:text-xl mt-8 ${
            activeTab === "venues" ? "font-semibold text-black" : "font-normal text-[#00000070]"
          }`}
          onClick={() => setActiveTab("venues")}
        >
          My Venues ({singleProfile._count.venues})
        </button>
        <div className="w-[1px] h-8 bg-[#00000050]"></div></> : null}
        <button
          type="button"
          className={`text-lg md:text-xl mt-4 ${
            activeTab === "bookings" ? "font-semibold text-black" : "font-normal text-[#00000070]"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings ({singleProfile._count.bookings})
        </button>
      </div>
        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
        <div className='flex flex-wrap justify-center md:justify-start md:gap-6'>
          {venueManager === "true" ? <>{activeTab === "venues" && (
            <>
              {singleProfile.venues.length ? singleProfile.venues.map((venue) => (
                <div key={venue.id} className='relative'>
                  <Link to={`/venue/${venue.id}`}>
                    <VenueCards media={venue.media[0]} name={venue.name} price={venue.price} location={venue.location.city} rating={venue.rating} overlay={``}/>
                  </Link>
                  <button type='button' className='absolute top-[-12px] right-[-12px] text-xl text-[#125C85] bg-[#A2D9FF] h-8 w-8 flex items-center justify-center rounded-full' data-id={venue.id} onClick={() => toggleVenueOverlay(venue.id)}><FontAwesomeIcon icon={faEllipsis}/></button>
                  <div className={`venueOverlay w-fit h-fit px-6 py-4 bg-[#125C85] absolute rounded top-6 right-0 text-sm text-white hidden`} data-id={venue.id}>
                    <Link to={`/update/${venue.id}`}> <p className='mb-4 hover:underline'>Edit venue</p></Link>
                    <button type='button' className='deleteVenueBtn hover:underline' onClick={deleteVenueByID} data-id={venue.id}>Delete venue</button>
                  </div>
                </div>
              )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Venues</p></div>}
            </>
          )}</> : null }
          
          {activeTab === "bookings" && (
            <>
              {singleProfile.bookings.length ? singleProfile.bookings.map((booking) => (
                <div key={booking.id} className='flex gap-4 relative'>
                  <Link to={`/venue/${booking.venue.id}`}>
                  <div className='w-[350px] md:w-[255px] flex gap-4 md:gap-0 md:flex-col h-[190px] md:h-[369px] p-2 bg-white rounded mb-8 md:mb-12 shadow hover:cursor-pointer relative'>
                        <div className='w-[190px] md:w-full h-[170px] md:h-[236px] relative'>
                          <div className="absolute left-0 right-0 bottom-0 top-[50%] bg-gradient-to-b from-[#00000000] to-[#00000070] rounded">
                          <p className="absolute bottom-2 left-2 text-white font-semibold text-lg z-30">${booking.venue.price}</p>
                          </div>
                            <img src={booking.venue.media[0]} alt="venue" className='w-full h-full object-cover rounded' />
                        </div>
                        <div className='flex flex-col h-full md:h-28 justify-between w-1/2 md:w-full'>
                            <div>
                                {booking.venue.city !== "Unknown" && booking.venue.city ? <p className="text-sm"><span className="text-gray-500">City: </span>{booking.venue.location}</p> : null}
                                <p className='font-semibold'>{booking.venue.name}</p>  
                            </div>
                            <div className='flex flex-col gap-2 text-sm'>
                              <p>
                                Guests: {booking.guests}
                              </p>
                              <p>
                                From: {new Date(booking.dateFrom).toLocaleDateString()}
                              </p>
                              <p>
                                To: {new Date(booking.dateTo).toLocaleDateString()}
                              </p>
                          </div>
                        </div>
                    </div>
                  </Link>
                  <button type='button' className='absolute top-[-12px] right-[-12px] text-xl text-[#125C85] bg-[#A2D9FF] h-8 w-8 flex items-center justify-center rounded-full' data-id={booking.id} onClick={() => toggleVenueOverlay(booking.id)}><FontAwesomeIcon icon={faEllipsis}/></button>
                  <div className={`venueOverlay w-fit h-fit px-6 py-4 bg-[#125C85] absolute rounded top-6 right-0 text-sm text-white hidden`} data-id={booking.id}>
                    <Link to="/"> <p className='mb-4 hover:underline'>Edit booking</p></Link>
                    <button type='button' className='deleteBookingBtn hover:underline' onClick={deleteBookingByID} data-id={booking.id}>Delete booking</button>
                  </div>
                  
                </div>
              )) : <div className='flex justify-center w-full mt-12 mb-24'><p className='text-2xl italic text-gray-600'>You have no Bookings</p></div>}
            </>
          )}
        </div>
      </>} </>}
        
    </div>
  )
}

export default Profile