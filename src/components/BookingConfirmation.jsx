import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const BookingConfirmation = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
        <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className='h-8 w-8 text-green-700'/>
            <h1 className="text-3xl font-semibold">Booking Completed</h1>
        </div>
        <p className='text-xl'>You can find your Bookinginformation under My Bookings on your <Link to={"/profile"} className='underline text-blue-700'>Profile</Link></p>
    </div>
  )
}

export default BookingConfirmation