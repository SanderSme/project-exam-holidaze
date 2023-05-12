import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './BookingCalendar.css'
import { bookVenue } from '../store/modules/venuesSlice';
import { useDispatch } from 'react-redux';
import BookingConfirmation from './BookingConfirmation';

const BookingCalendar = (props) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState(props.maxGuests);
  const [numberOfGuestsChosen, setNumberOfGuestsChosen] = useState(1);
  useEffect(() => {
    setMaxGuests(props.maxGuests);
  }, [props.maxGuests]);

  const guestOptions = Array.from({ length: maxGuests }, (_, i) => (
    <option key={i} value={i + 1}>{i + 1}</option>
  ));

  const handleCalendarChange = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const handleGuestsChange = (event) => {
    setNumberOfGuestsChosen(event.target.value);
  };

  let disabledDateRanges = [];

  function getDisabledDateRanges(arr) {

    arr.forEach((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      end.setDate(end.getDate() - 1);
      start.setDate(start.getDate() - 1);
      const disabledRange = { start, end };
      disabledDateRanges.push(disabledRange);
    });
    return disabledDateRanges;
  }

  getDisabledDateRanges(props.bookingsArray)
  const errorMessage = document.getElementById("errorMessage")
  const overlappingRange = disabledDateRanges.find(disabledRange =>
    (startDate >= disabledRange.start && startDate <= disabledRange.end) ||
    (endDate >= disabledRange.start && endDate <= disabledRange.end) ||
    (startDate < disabledRange.start && endDate > disabledRange.end)
  );
  if (startDate && endDate && overlappingRange) {
    setStartDate(null);
    setEndDate(null);
    errorMessage.classList.remove('hidden')
    return;
  }


  const bookingConfirmation = document.getElementById('bookingConfirmation')
  const bookingForm = document.getElementById('bookingForm')
  function sendBooking() {

    const venueData = {
      dateFrom: `${startDate}`,
      dateTo: `${endDate}`,
      guests: parseFloat(numberOfGuestsChosen),
      venueId: `${props.id}`
    }
    dispatch(bookVenue(venueData));
    bookingForm.classList.add('hidden')
    bookingConfirmation.classList.remove('hidden')
  }

  return (
    <>
    <div id='bookingForm' className='flex flex-col lg:flex-row w-full justify-around'>
      <div className='w-full lg:w-1/2 p-4 bg-[#307095] h-fit rounded'>
        <div className='md:flex'>
          <Calendar
            locale='en-EN'
            onChange={handleCalendarChange}
            selectRange={true}
            returnValue='range'
            tileClassName={({ date }) =>
              date.toDateString() === new Date().toDateString() ? "today" : null
            }
            tileDisabled={({ date }) =>
            date < new Date() ||
              disabledDateRanges.some(disabledDateRange =>
                date >= disabledDateRange.start && date <= disabledDateRange.end
              )
            }
          />
          <div className='bg-white p-2 flex flex-wrap md:flex-col gap-4 rounded-r'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded bg-[#a2d9ff]'></div>
              <p>Today</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded bg-[#DDFECA]'></div>
              <p>Available</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded bg-[#FFC0BE]'></div>
              <p>Booked</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded bg-[#FFC107]'></div>
              <p>Selected</p>
            </div>
          </div>
        </div>
        <p id="errorMessage" className='hidden text-red-400 font-semibold'>Chosen dates is already booked</p>
      </div>
      <div className='w-full lg:w-1/3 mt-4 lg:mt-0'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col'>
            <label htmlFor="guests">Guests:</label>
            <select name="guests" id="guests" className='border shadow p-1 rounded hover:cursor-pointer' onChange={handleGuestsChange}>
              {guestOptions}
            </select>
          </div>
          <div className='bg-white rounded shadow py-2 px-4 flex flex-col gap-4'>
            <h2 className='font-semibold text-lg'>Summary</h2>
            <div className='flex justify-between w-full items-center'>
              <p className='italic'>Dates:</p>
              <div className="italic md:flex md:gap-2 lg:block lg:gap-0">
                <p>{startDate?.toLocaleDateString()}</p>
                <p>To</p>
                <p>{endDate?.toLocaleDateString()}</p>
              </div>
              <div className='flex flex-col items-end'>
                <p>${props.price * numberOfNights}</p>
                <p className='text-sm italic opacity-80'>({numberOfNights} days)</p>
              </div>
            </div>
            <div className='h-[1px] w-full bg-black opacity-20'></div>
            <div className='flex justify-between italic'>
              <p>Guests:</p>
              <p>{numberOfGuestsChosen}</p>
              <p>x{numberOfGuestsChosen}</p>
            </div>
            <div className='h-[1px] w-full bg-black opacity-20'></div>
            <div className='flex justify-between font-semibold'>
              <p>Total</p>
              <p>${props.price * numberOfNights * numberOfGuestsChosen}</p>
            </div>
          </div>
          <button type="button" onClick={() => sendBooking()} className="bg-[#FFC107] w-full md:w-1/2 lg:w-1/3 py-1 rounded shadow place-self-end text-black">Book now</button>
        </div>
      </div>
    </div>
    <div id='bookingConfirmation' className='hidden'>
      <BookingConfirmation/>
    </div>
    </>
  )
}

export default BookingCalendar