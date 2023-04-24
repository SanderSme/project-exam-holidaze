import HeroBanner from './HeroBanner'
import VenueCards from './VenueCards'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVenues } from '../../store/modules/venuesSlice'
import { Link } from "react-router-dom"

const HomePage = () => {
    const dispatch = useDispatch()
    const {venues} = useSelector(state => state.venues)
    useEffect(() => {
        dispatch(fetchVenues())
    }, [dispatch])
  return (
    <div>
        <HeroBanner/>
        <div className='max-w-7xl w-11/12 mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl mt-4'>Venues</h1>
                <button className='px-8 h-[30px] rounded bg-[#125C85] text-white'>Filter</button>
            </div>
            <div className='w-full h-[1px] bg-gray-400 mb-8'>
            </div>
            <div className='flex flex-wrap justify-center md:justify-around xl:justify-between md:gap-4'>
                {venues.map((venue) => (
                    <div key={venue.id}>
                        <Link to={`/venue/${venue.id}`}>
                        <VenueCards media={venue.media[0]} name={venue.name} price={venue.price}/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage