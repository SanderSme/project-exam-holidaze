import { useState, useEffect} from "react"
import { fetchVenues } from "../store/modules/venuesSlice";
import { useDispatch } from "react-redux";

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        const overlay = document.getElementById("overlay");
        overlay.addEventListener("click", removeOverlay);
        return () => overlay.removeEventListener("click", removeOverlay);
      }, []);

    const fetchData = (value) => {
        value = value.toLowerCase();
        fetch('https://nf-api.onrender.com/api/v1/holidaze/venues').then((response) => response.json()).then((json) => {
            const searchResults = json.filter((venue) => {
                return value && venue && venue.name && venue.name.toLowerCase().includes(value)
            })
            setResults(searchResults)
            localStorage.setItem('searchResults', JSON.stringify(searchResults))
        })
    }

    const goToSearchResults = () => {
        window.location.href = "/search-results"
    }

    const removeOverlay = () => {
        document.getElementById("overlay").classList.add("hidden")
        document.getElementById("searchList").classList.add("hidden")
        setInput("")
    }

    const handleChange = (value) => {
        document.getElementById("overlay").classList.remove('hidden')
        document.getElementById("searchList").classList.remove("hidden")
        setInput(value)
        fetchData(value)
        if(value === "") {
            document.getElementById("overlay").classList.add("hidden")
        }
    }
  return (
    <div className='h-[30px] w-[300px] sm:w-[350px] lg:w-[410px] bg-[#F5F9FF] rounded absolute left-[50%] translate-x-[-50%] top-20 md:top-auto flex items-center p-1 z-40'>
        <input type="text" name="search" value={input} onChange={(e) => handleChange(e.target.value)} className='w-11/12 h-full bg-[#F5F9FF] rounded mr-2' />
        <button type='button' disabled={input === ""} onClick={goToSearchResults} className='h-[24px] w-[92px] bg-[#125C85] rounded text-white'>Search</button>
    </div>
  )
}

export default SearchBar