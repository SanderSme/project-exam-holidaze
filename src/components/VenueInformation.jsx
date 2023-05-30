import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { faParking } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VenueInformation = (props) => {
  return (
        <div className='w-full md:ml-8 lg:ml-0 md:w-2/5 lg:w-1/4 bg-gradient-to-b from-[#125C85] to-[#307095] rounded shadow p-4 text-white'>
            <div className='mb-8 flex w-full justify-center md:justify-start gap-2 items-center'>
                <div className='h-20 w-20 md:h-12 md:w-12 rounded-full bg-[#FFC107] flex justify-center items-center font-semibold text-xl text-black border border-black'>
                    {props.avatar ? <img src={props.avatar} alt="profile-pic" className='h-full w-full rounded-full object-cover'/> : props.name["0"].toUpperCase()}
                    
                </div>
                <div>
                    <p>{props.name}</p>
                </div>
            </div>
            <h2 className='font-semibold'>Property information</h2>
            <div className='h-[1px] w-full bg-[#ffffff40] my-2'></div>
                <div className='flex w-full justify-between mt-4'>
                    <p className='font-semibold'>Price:</p>
                    <p>${props.price} / day</p>
                </div>
                <div className='h-[1px] w-full bg-[#ffffff20] my-2'></div>
                <div className='flex w-full justify-between mt-4'>
                    <p className='font-semibold'>Max guests:</p>
                    <p>{props.maxGuests}</p>
                </div>
                <div className='h-[1px] w-full bg-[#ffffff20] my-2'></div>
            <div className='mt-4'>
                <p className='font-semibold mb-4'>Facilities:</p>
                <div className='flex flex-wrap gap-x-20 gap-y-4 mb-8'>
                    {props.wifi === true ? <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faWifi}/>
                        <p>Wifi</p>
                    </div> : null}
                    {props.parking === true ? <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faParking}/>
                        <p>Parking</p>
                    </div> : null}
                    {props.breakfast === true ? <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faBurger}/>
                        <p>Breakfast</p>
                    </div> : null}
                    {props.pets === true ? <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faDog}/>
                        <p>Pets</p>
                    </div> : null}
                </div>
            </div>
            {props.address && props.address !== "Unknown" ? 
            <><div className='h-[1px] w-full bg-[#ffffff20] my-2'></div>
            <div className='mt-4'>
                <p className='font-semibold mb-4'>Address:</p>
                <p className='mb-2'>{props.address}</p>
                <div className='flex w-full justify-between'>
                    <div>
                        {props.city && props.city !== "Unknown" ? <p className='mb-2'>{props.city}</p> : null}
                        {props.country && props.country !== "Unknown" ? <p>{props.country}</p> : null}
                    </div>
                    <div>
                        {props.zip && props.zip !== "Unknown" ? <p className='mb-2'>{props.zip}</p> : null}
                        {props.continent && props.continent !== "Unknown" ? <p>{props.continent}</p> : null}
                    </div>
                </div>
            </div></> : null}
        </div>
  )
}

export default VenueInformation