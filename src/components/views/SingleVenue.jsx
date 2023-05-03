import { NavLink } from 'react-router-dom'
import { fetchSingleVenue } from '../../store/modules/venuesSlice'
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingCalendar from '../BookingCalendar'
import VenueInformation from '../VenueInformation'

const SingleVenue = () => {
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

  return (
    <div className='max-w-7xl w-11/12 mx-auto'>
        <div>
        {singleVenue && 
            <>
            <div className='flex justify-between mt-4'>
                <NavLink to={'/'}>
                    <p className='underline italic'>Back to homepage</p>
                </NavLink>
                <p className='text-gray-500 italic'>Posted on: {new Date(singleVenue.created).toLocaleDateString()}</p>
            </div>
            <Slider {...settings}>
            {singleVenue.media.map((media) => (
            <div key={media} className='h-[350px] w-full mt-2 rounded'>
                <img src={media} alt="venue" className='h-full w-full md:w-auto object-cover mx-auto rounded shadow'/>
            </div>
            ))}
            </Slider>
            <div>
                <h1 className='text-3xl mt-12'>{singleVenue.name}</h1>
            </div>
            <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
            <div className='flex flex-col-reverse md:flex-row w-full justify-between'>
                <p className='w-full mt-8 md:mt-0 md:w-2/3'>{singleVenue.description}</p>
                <VenueInformation name={singleVenue.owner.name} avatar={singleVenue.owner.avatar} price={singleVenue.price} maxGuests={singleVenue.maxGuests} wifi={singleVenue.meta.wifi} parking={singleVenue.meta.parking} breakfast={singleVenue.meta.breakfast} pets={singleVenue.meta.pets} address={singleVenue.location.address} city={singleVenue.location.city} zip={singleVenue.location.zip} country={singleVenue.location.country} continent={singleVenue.location.continent}/>
            </div>
            <div className='mt-8'>
            <h1 className='text-2xl mt-4'>Availability</h1>
            <div className='w-full h-[1px] bg-gray-400 mb-8'>
            </div>
            <BookingCalendar/>
            </div>
            </>}
            
        </div>
    </div>
  )
}

export default SingleVenue