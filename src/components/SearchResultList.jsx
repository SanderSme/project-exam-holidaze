import { NavLink } from "react-router-dom"
const SearchResults = ({results}) => {
  return (
    <div className="w-[350px] bg-[#F5F9FF] flex flex-col justify-center shadow-md rounded max-h-[500px] overflow-y-scroll absolute top-20 left-[50%] translate-x-[-50%] z-20 px-3 gap-2">
       {results.map((venue, id) => {
           return <NavLink to={`/venue/${venue.id}`} key={id}>
                    <div className="bg-white rounded shadow w-[300px] h-[152px] flex gap-2 justify-between items-center my-2 p-1 pl-2">
                        <div className="w-[140px] h-[140px] rounded">
                            <img src={venue.media[0]} alt={venue.title} className="w-full h-full object-cover rounded" />
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-between">
                            <h2 className="text-sm">{venue.name}</h2>
                            <p className="text-xs">Starting from ${venue.price}</p>
                        </div>
                    </div>
                </NavLink>
       })}
    </div>)
}

export default SearchResults