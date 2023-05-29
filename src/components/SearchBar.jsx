import { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import SearchResultList from "./SearchResultList";
import {SET_SEARCH_VENUE} from '../store/modules/venuesSlice'

const SearchBar = () => {
    const dispatch = useDispatch()
    const searchQuery = useSelector((state) => state.venues.searchVenue)
    const [searchResults, setSearchResults] = useState([])
    const fetchData = (value) => {
        value = value.toLowerCase();
        fetch('https://nf-api.onrender.com/api/v1/holidaze/venues?sort=created&sortOrder=desc&&_owner=true&_bookings=true').then((response) => response.json()).then((json) => {
            let results = json.filter((venue) => {
                const nameMatch = value && venue && venue.name && venue.name.toLowerCase().includes(value);
                const cityMatch = value && venue && venue.location.city && venue.location.city.toLowerCase().includes(value);
                return nameMatch || cityMatch;
            })
            setSearchResults(results)
            localStorage.setItem('searchResults', JSON.stringify(results))
        })
    }

    const handleChange = (e) => {
        document.getElementById("overlay").classList.remove('hidden')
        document.getElementById("searchList").classList.remove("hidden")
        if(e.target.value === "") {
            document.getElementById("overlay").classList.add('hidden')
        document.getElementById("searchList").classList.add("hidden")
        }
        dispatch(SET_SEARCH_VENUE(e.target.value))
        fetchData(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SET_SEARCH_VENUE(e.target.elements.search.value))
        window.location.href = "/search-results"
    }

    useEffect(() => {
        const overlay = document.getElementById("overlay");
        overlay.addEventListener("click", removeOverlay);
        return () => overlay.removeEventListener("click", removeOverlay);
      }, []);

    const removeOverlay = () => {
        document.getElementById("overlay").classList.add("hidden")
        document.getElementById("searchList").classList.add("hidden")
        setInput("")
    }

  return (
        <>
            <form onSubmit={handleSubmit} className='h-[30px] w-[300px] sm:w-[350px] lg:w-[410px] bg-[#F5F9FF] rounded absolute left-[50%] translate-x-[-50%] top-20 md:top-auto flex items-center p-1 z-40'>
                <input type="text" name="search" value={searchQuery} onChange={handleChange} className='w-11/12 h-full bg-[#F5F9FF] rounded mr-2' />
                <button type='submit' disabled={searchQuery === ""} className='h-[24px] w-[92px] bg-[#125C85] rounded text-white'>Search</button>
            </form>
            <SearchResultList results={searchResults}/>
        </>
  )
}

export default SearchBar