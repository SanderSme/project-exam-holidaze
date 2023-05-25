import VenueCards from '../VenueCards'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Error from '../layout/Error'

const SearchResults = () => {
    const venuesFromLocalStorrage = localStorage.getItem('searchResults')
    const searchResult = JSON.parse(venuesFromLocalStorrage)
    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 12;
    const totalPages = Math.ceil(searchResult.length / venuesPerPage);
    const {isError} = useSelector(state => state.error);
    const {errorMessage} = useSelector(state => state.error);
    const pages = [];
    for (let i = 1; i <= Math.ceil(searchResult.length / venuesPerPage); i++) {
        pages.push(i);}

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }, [])
  return (
    <div className='mt-28'>
        <div className='max-w-7xl w-11/12 mx-auto'>
            {isError ? 
                <Error message={errorMessage}/> : 
                <>
                    <div className='flex justify-between items-center relative'>
                        <h1 className='text-2xl mt-4'>Search results:</h1>
                    </div>
                    <div className='w-full h-[1px] bg-gray-400 mb-8'>
                    </div>
                    <div className='flex flex-wrap justify-center md:justify-around md:gap-1'>
                        {searchResult.length === 0 ? 
                            <div className='flex flex-col items-center gap-4 justify-center w-full mt-12 mb-24'>
                                <p className='text-2xl italic text-gray-600'>No results matching your search</p>
                                <Link to={'/'} className='mb-24 underline'>Show all venues</Link>
                            </div> : 
                            searchResult
                            .slice((currentPage - 1) * venuesPerPage, currentPage * venuesPerPage)
                            .map((venue) => (
                                <div key={venue.id}>
                                    <Link to={`/venue/${venue.id}`}>
                                        <VenueCards 
                                            media={venue.media[0]} 
                                            name={venue.name} 
                                            price={venue.price} 
                                            location={venue.location.city} 
                                            hover="md:hover:scale-110" 
                                            rating={venue.rating}/>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-between w-full md:w-2/3 lg:w-2/3 mx-auto my-8">
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mx-2 w-8 h-8 rounded-full bg-[#125C85] text-white hover:bg-[#A2D9FF] hover:text-black"
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <div>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`md:mx-1 lg:mx-2 w-6 h-6 md:w-8 md:h-8 rounded-full hover:bg-[#A2D9FF] hover:text-black text-xs md:text-sm ${
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
                        className="mx-2 w-8 h-8 rounded-full bg-[#125C85] text-white hover:bg-[#A2D9FF] hover:text-black"
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

export default SearchResults