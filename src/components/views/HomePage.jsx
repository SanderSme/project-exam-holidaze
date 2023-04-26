import HeroBanner from './HeroBanner'
import VenueCards from '../VenueCards'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVenues } from '../../store/modules/venuesSlice'
import { Link } from "react-router-dom"
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LowestPrice, BestRated } from '../Stickers'


const HomePage = () => {
    const dispatch = useDispatch()
    const {venues, cheapestHouses, topRatedHouses} = useSelector(state => state.venues)
    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 12;
    const totalPages = Math.ceil(venues.length / venuesPerPage);

    const pages = [];

    for (let i = 1; i <= Math.ceil(venues.length / venuesPerPage); i++) {
        pages.push(i);}

    useEffect(() => {
        dispatch(fetchVenues())
    }, [dispatch])

  return (
    <div>
        <HeroBanner/>
        <div className='max-w-7xl w-11/12 mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl mt-4'>Venues</h1>
                <button className='px-4 h-[30px] rounded bg-[#125C85] text-white'><FontAwesomeIcon icon={faFilter}/> Filter</button>
            </div>
            <div className='w-full h-[1px] bg-gray-400 mb-8'>
            </div>
            <div className='flex flex-wrap justify-center md:justify-around md:gap-1'>
                {venues
                .slice((currentPage - 1) * venuesPerPage, currentPage * venuesPerPage)
                .map((venue) => (
                    <div key={venue.id}>
                        <Link to={`/venue/${venue.id}`}>
                        <VenueCards media={venue.media[0]} name={venue.name} price={venue.price} location={venue.location.city} rating={venue.rating} sticker={cheapestHouses && cheapestHouses.find(house => house.id === venue.id) ? <LowestPrice /> : null} sticker2={topRatedHouses && topRatedHouses.find(house => house.id === venue.id) ? <BestRated /> : null}/>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-between w-full md:w-2/3 lg:w-2/3 mx-auto my-8">
                <button 
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 w-10 h-10 rounded-full bg-[#125C85] text-white hover:bg-[#A2D9FF] hover:text-black"
                >
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <div>
                {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`mx-2 w-10 h-10 rounded-full hover:bg-[#A2D9FF] hover:text-black ${
                        currentPage === page && "bg-[#125C85] text-white"
                    }`}
                    >
                    {page}
                </button>
                    ))}
                    </div>
                <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 w-10 h-10 rounded-full bg-[#125C85] text-white hover:bg-[#A2D9FF] hover:text-black"
                >
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HomePage