import VenueForm from "../VenueForm"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const NewVenue = () => {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
  }, [])
  const venueManager = localStorage.getItem('venueManager')

  return (
    <div className="max-w-7xl w-11/12 mx-auto mt-32">
        <div>
            <h1 className='text-2xl'>New Venue</h1>
        </div>
        <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
        {venueManager === "true" ? <VenueForm/>: 
          <div className="text-center mt-12 mb-80">
            <p className="mb-4 text-lg">To create a venue you have to be a registered venue manager</p>
            <Link to={"/"} className='underline text-blue-600 italic'>Back to Homepage</Link>
          </div>
        }
        
    </div>
  )
}

export default NewVenue