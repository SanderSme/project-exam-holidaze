import { NavLink } from 'react-router-dom'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { faParking } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchSingleVenue } from '../../store/modules/venuesSlice'
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <div key={media.index} className='h-[350px] w-full mt-2 rounded'>
                <img src={media} alt="venue" className='h-full mx-auto rounded'/>
            </div>
            ))}
            </Slider>
            <div>
                <h1 className='text-2xl mt-12'>{singleVenue.name}</h1>
            </div>
            <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
            <div className='flex flex-col-reverse md:flex-row w-full justify-between'>
                <p className='w-full md:w-2/3'>{singleVenue.description}</p>
                <div className='w-full md:ml-8 lg:ml-0 md:w-2/5 lg:w-1/5'>
                    <h2 className='font-semibold mb-4'>Property information</h2>
                    <div className='flex justify-between w-2/3 md:w-full'>
                        <div>
                            <p className='font-semibold'>Price:</p>
                            <p>${singleVenue.price} / night</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Max guests:</p>
                            <p>{singleVenue.maxGuests}</p>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <p className='font-semibold mb-4'>Facilities:</p>
                        <div className='flex flex-wrap gap-x-20 gap-y-8 mb-8'>
                            {singleVenue.meta.wifi === true ? <div className='flex gap-2 items-center'>
                                <FontAwesomeIcon icon={faWifi}/>
                                <p>Wifi</p>
                            </div> : null}
                            {singleVenue.meta.parking === true ? <div className='flex gap-2 items-center'>
                                <FontAwesomeIcon icon={faParking}/>
                                <p>Parking</p>
                            </div> : null}
                            {singleVenue.meta.breakfast === true ? <div className='flex gap-2 items-center'>
                                <FontAwesomeIcon icon={faBurger}/>
                                <p>Breakfast</p>
                            </div> : null}
                            {singleVenue.meta.pets === true ? <div className='flex gap-2 items-center'>
                                <FontAwesomeIcon icon={faDog}/>
                                <p>Pets</p>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div> 
            </>}
            
        </div>
    </div>
  )
}

export default SingleVenue