

const VenueCards = (props) => {
  return (
    <div className='w-[373px] md:w-[255px] flex gap-4 md:gap-0 md:flex-col h-[190px] md:h-[369px] p-2 bg-white rounded mb-8 md:mb-12 shadow hover:scale-110 hover:cursor-pointer'>
        <div className='w-[190px] md:w-full h-[170px] md:h-[236px]'>
            <img src={props.media} alt="venue" className='w-full h-full object-cover rounded' />
        </div>
        <div className='flex flex-col h-full md:h-28 justify-between w-1/2 md:w-full'>
            <div>
                <p className='font-semibold'>{props.name}</p>
                <p className='italic text-gray-500'>No reviews</p>
            </div>
            <p>Starting from: <span className='font-semibold'>${props.price}</span></p>
        </div>
    </div>
  )
}

export default VenueCards