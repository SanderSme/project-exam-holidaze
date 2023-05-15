import StarRating from "./StarRating"
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VenueCards = (props) => {
  const MAX_NAME_LENGTH = 50;
  let displayName = props.name;
  if (displayName.length > MAX_NAME_LENGTH) {
    displayName = `${displayName.slice(0, MAX_NAME_LENGTH)}...`;
  }
  return (
    <div className={`w-[350px] md:w-[255px] flex gap-4 md:gap-0 md:flex-col h-[190px] md:h-[369px] p-2 bg-white rounded mb-8 md:mb-12 shadow ${props.hover} hover:cursor-pointer relative`}>
      {props.sticker2}
        <div className='w-[190px] md:w-full h-[170px] md:h-[236px] relative'>
          <div className="absolute left-0 right-0 bottom-0 top-[50%] bg-gradient-to-b from-[#00000000] to-[#00000070] rounded">
          <p className="absolute bottom-2 left-2 text-white font-semibold text-lg z-20">${props.price}</p>
          {props.sticker}
          </div>
          {props.media ? <img src={props.media} alt="venue" className='w-full h-full object-cover rounded' /> : <FontAwesomeIcon icon={faImage} className="w-full h-full object-cover text-gray-200"/>}
            
        </div>
        <div className='flex flex-col h-full md:h-28 justify-between w-1/2 md:w-full'>
            <div>
                {props.location !== "Unknown" && props.location ? <p className="text-sm"><span className="text-gray-500">City: </span>{props.location}</p> : null}
                <p className='font-semibold break-words'>{displayName}</p>  
            </div>
            {props.rating > 0 ? <StarRating rating={props.rating}/> : <p className='italic text-gray-500'>No reviews</p>}
        </div>
    </div>
  )
}

export default VenueCards