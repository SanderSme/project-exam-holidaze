import HeroBanner from '../HeroBanner'
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
import Filter from '../Filter'
import Error from '../layout/Error'


const HomePage = () => {
    const dispatch = useDispatch()
    const {venues, cheapestHouses, topRatedHouses} = useSelector(state => state.venues)
    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 12;
    const totalPages = Math.ceil(venues.length / venuesPerPage);
    const [venuesToDisplay, setVenuesToDisplay] = useState([]);
    const [isFilterCleared, setIsFilterCleared] = useState(false);
    const {isError} = useSelector(state => state.error);
    const {errorMessage} = useSelector(state => state.error);
    const pages = [];

    for (let i = 1; i <= Math.ceil(venuesToDisplay.length / venuesPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        dispatch(fetchVenues())
    }, [dispatch])

    useEffect(() => {
        setVenuesToDisplay(venues)
        setIsFilterCleared(false)
    }, [venues])

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
      }, [])

    function updateVenuesToDisplay(filteredVenues) {
        setVenuesToDisplay(filteredVenues)
        setIsFilterCleared(false)
    }

    function displayFilter() {
        document.getElementById('filter').classList.toggle('hidden')
    }

    function clearFilter() {
        setVenuesToDisplay(venues);
        setIsFilterCleared(true);
        document.getElementById('filter').classList.add('hidden')
      }

    function nextPage() {
        setCurrentPage(currentPage + 1)
        if (window.innerWidth <= 768) { // Mobile devices have a width less than or equal to 768px
            window.scrollTo({top: 300, left: 0, behavior: 'smooth'});
        } else {
            window.scrollTo({top: 500, left: 0, behavior: 'smooth'});
        }
    }

    function prevPage() {
        setCurrentPage(currentPage - 1)
        if (window.innerWidth <= 768) { // Mobile devices have a width less than or equal to 768px
            window.scrollTo({top: 300, left: 0, behavior: 'smooth'});
        } else {
            window.scrollTo({top: 500, left: 0, behavior: 'smooth'});
        }
    }


  return (
    <div className='mt-28'>
        <HeroBanner/>
        <div className='max-w-7xl w-11/12 mx-auto'>
            {isError ? <Error message={errorMessage}/> : 
                <>
                    <div className='flex justify-between items-center relative'>
                        <h1 className='text-2xl mt-4'>Venues</h1>
                        <button onClick={displayFilter} className='px-4 h-[30px] rounded bg-[#125C85] text-white z-30'><FontAwesomeIcon icon={faFilter}/> Filter</button>
                        <Filter venue={venues} updateVenuesToDisplay={updateVenuesToDisplay} clearFilter={clearFilter} isFilterCleared={isFilterCleared}/>
                    </div>
                    <div className='w-full h-[1px] bg-gray-400 mb-8'>
                    </div>
                    <div className='flex flex-wrap justify-center md:justify-around md:gap-1'>
                        {venuesToDisplay
                            .slice((currentPage - 1) * venuesPerPage, currentPage * venuesPerPage)
                            .map((venue) => (
                                <div key={venue.id}>
                                    <Link to={`/venue/${venue.id}`}>
                                        <VenueCards media={venue.media[0]} name={venue.name} price={venue.price} location={venue.location.city} hover="md:hover:scale-110" rating={venue.rating} sticker={cheapestHouses && cheapestHouses.find(house => house.id === venue.id) ? <LowestPrice /> : null} sticker2={topRatedHouses && topRatedHouses.find(house => house.id === venue.id) ? <BestRated /> : null}/>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-between w-full md:w-2/3 lg:w-2/3 mx-auto my-8">
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="mx-2 w-8 h-8 rounded-full bg-[#125C85] text-white lg:hover:bg-[#A2D9FF] lg:hover:text-black"
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <div>
                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`md:mx-1 lg:mx-2 w-6 h-6 md:w-8 md:h-8 rounded-full lg:hover:bg-[#A2D9FF] lg:hover:text-black text-xs md:text-sm ${
                                        currentPage === page && "bg-[#125C85] text-white"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="mx-2 w-8 h-8 rounded-full bg-[#125C85] text-white lg:hover:bg-[#A2D9FF] lg:hover:text-black"
                            >
                                <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
                </>
            }  
        </div>
    </div>
  )
}

export default HomePage