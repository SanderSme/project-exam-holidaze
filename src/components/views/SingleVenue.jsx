import { NavLink, Link } from 'react-router-dom'
import { fetchSingleVenue } from '../../store/modules/venuesSlice'
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingCalendar from '../BookingCalendar'
import VenueInformation from '../VenueInformation'
import BookingsCard from '../BookingsCard';
import Error from '../layout/Error';

const SingleVenue = () => {
    const accessToken = localStorage.getItem('accessToken')
    const userName = localStorage.getItem('userName')
    let {id} = useParams()
    const dispatch = useDispatch()
    const {singleVenue} = useSelector(state => state.venues)
    useEffect(() => {
        if(id){
            dispatch(fetchSingleVenue(id))
        }
    }, [dispatch, id])
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      }

      const {isError} = useSelector(state => state.error);
    const {errorMessage} = useSelector(state => state.error);

  return (
    <div className='max-w-7xl w-11/12 mx-auto mt-28 mb-8'>
        {isError ? <Error message={errorMessage}/> : <div>
            {singleVenue && 
                <>
                <div className='flex justify-between mt-4'>
                    <NavLink to={'/'}>
                        <p className='underline italic'>Back to homepage</p>
                    </NavLink>
                    <p className='text-gray-500 italic'>Posted on: {new Date(singleVenue.created).toLocaleDateString()}</p>
                </div>
                <Slider {...settings}>
                {singleVenue.media && singleVenue.media.map((media) => (
                <div key={media} className='h-[350px] w-full mt-2 rounded'>
                    <img src={media} alt="venue" className='h-full w-full md:w-auto object-cover mx-auto rounded shadow'/>
                </div>
                ))}
                </Slider>
                <div>
                    <h1 className='text-3xl mt-12 break-words'>{singleVenue.name}</h1>
                </div>
                <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
                <div className='flex flex-col-reverse md:flex-row w-full justify-between'>
                    <p className='w-full mt-8 md:mt-0 md:w-2/3 break-words'>{singleVenue.description}</p>
                    <VenueInformation name={singleVenue.owner.name} avatar={singleVenue.owner.avatar} price={singleVenue.price} maxGuests={singleVenue.maxGuests} wifi={singleVenue.meta.wifi} parking={singleVenue.meta.parking} breakfast={singleVenue.meta.breakfast} pets={singleVenue.meta.pets} address={singleVenue.location.address} city={singleVenue.location.city} zip={singleVenue.location.zip} country={singleVenue.location.country} continent={singleVenue.location.continent}/>
                </div>
                <div className='mt-8 mb-24'>
                {accessToken ? <>{singleVenue.owner.name === userName ?
                    <>
                        <h1 className='text-2xl mt-4'>Bookings</h1>
                        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
                        {singleVenue.bookings.length ?
                            <div className='flex gap-8 justify-around flex-wrap'>{singleVenue.bookings.map((booking) => (
                                <div key={booking.id}>
                                <BookingsCard id={booking.id} dateFrom={booking.dateFrom} dateTo={booking.dateTo} guests={booking.guests}/>
                                </div>
                            ))}</div> :
                            <div className='flex justify-center w-full mt-12 mb-24'>
                                <p className='text-2xl italic text-gray-600'>No bookings for this venue</p>
                            </div>
                        }
                    </> :
                    <div>
                        <h1 className='text-2xl mt-4'>Availability</h1>
                        <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
                        <BookingCalendar maxGuests={singleVenue.maxGuests} price={singleVenue.price} id={singleVenue.id} bookingsArray={singleVenue.bookings}/>
                    </div>
                }</> : <div>
                <h1 className='text-2xl mt-4'>Availability</h1>
                <div className='w-full h-[1px] bg-gray-400 mb-8'></div>
                <div className='flex justify-center w-full mt-12 mb-24'>
                    <p className='text-xl italic text-gray-600'><Link to={'/login'} className='underline text-blue-600'>Sing in</Link> to make reservation</p>
                </div>
            </div>}
                
                </div>
        </>}
    </div>}
        
    </div>
  )
}

export default SingleVenue