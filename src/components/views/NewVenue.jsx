import VenueForm from "../VenueForm"

const NewVenue = () => {

  return (
    <div className="max-w-7xl w-11/12 mx-auto">
        <div>
            <h1 className='text-2xl mt-8'>New Venue</h1>
        </div>
        <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
        <VenueForm/>
    </div>
  )
}

export default NewVenue