import VenueForm from "../VenueForm"
import { useEffect } from "react"

const NewVenue = () => {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
  }, [])

  return (
    <div className="max-w-7xl w-11/12 mx-auto mt-32">
        <div>
            <h1 className='text-2xl'>New Venue</h1>
        </div>
        <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
        <VenueForm/>
    </div>
  )
}

export default NewVenue