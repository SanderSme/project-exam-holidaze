import { NavLink } from "react-router-dom"
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SearchResults = ({results}) => {
    const removeOverlay = () => {
        document.getElementById("overlay").classList.add("hidden")
        document.getElementById("searchList").classList.add("hidden")
        setInput("")
    }
  return (
    <div className="w-[300px] lg:w-[410px] bg-[#F5F9FF] flex flex-col justify-center shadow-md rounded-b h-fit max-h-[500px] overflow-y-scroll absolute top-28 md:top-16 left-[50%] translate-x-[-50%] z-40 px-3 gap-2" id="searchList">
       {results.map((venue, id) => {
           return <NavLink to={`/venue/${venue.id}`} key={id} onClick={removeOverlay}>
                    <div className="bg-white rounded shadow w-[280px] h-[152px] flex gap-2 justify-between items-center my-2 p-1 pl-2">
                        <div className="w-[140px] h-[140px] rounded">
                            {venue.media[0] ? <img src={venue.media[0]} alt="venue" className='w-full h-full object-cover rounded' /> : <FontAwesomeIcon icon={faImage} className="w-full h-full object-cover text-gray-200"/>}
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-between">
                            <h2 className="text-sm">{venue.name}</h2>
                            <div className="text-xs">
                                {venue.location.city !== "Unknown" ? <p className="mb-2">City: {venue.location.city}</p> : null}
                                <p>Starting from ${venue.price}</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
       })}
    </div>)
}

export default SearchResults