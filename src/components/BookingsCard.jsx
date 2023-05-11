const BookingsCard = (props) => {
  function displayID(bookingID) {
    const ID = document.querySelectorAll('.ID')
    for(let i = 0; i < ID.length; i++) {
        if(ID[i].dataset.id === bookingID) {
          ID[i].classList.toggle('hidden')
      }
    }
  }
  return (
      <>
          <div className="w-64 h-fit p-3 bg-white shadow rounded">
            <div className="font-semibold flex justify-between">
              <p>Booking:</p>
              <button type="button" data-id={props.id} onClick={() => displayID(props.id)} className="underline">ID</button>
            </div>
            <p className="ID text-xs hidden mt-4" data-id={props.id}>{props.id}</p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between">
                <p>From: </p>
                <p>{new Date(props.dateFrom).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p>To: </p>
                <p>{new Date(props.dateTo).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Guests: </p>
                <p>{props.guests}</p>
              </div>
            </div>
          </div>
      </>
  )
}

export default BookingsCard
