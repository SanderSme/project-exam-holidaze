import { useFormik } from "formik"
import { useEffect } from "react";

const Filter = (props) => {
    const formik = useFormik({
        initialValues: {
            minPrice: 1,
            maxPrice: 1,
            minGuests: 1,
            maxGuests: 1,
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false
        },
        onSubmit: (values) => {
            const filterData = {
            minPrice: values.minPrice,
            maxPrice: values.maxPrice,
            minGuests: values.minGuests,
            maxGuests: values.maxGuests,
            wifi: values.wifi,
            parking: values.parking,
            breakfast: values.breakfast,
            pets: values.pets
            }
            console.log(filterData);
            if(props.isFilterCleared) {
                const filteredVenues = props.venue;
                props.updateVenuesToDisplay(filteredVenues)
            } else {
                const filteredVenues = props.venue.filter((venue) => {
                    document.getElementById('filter').classList.add('hidden')
                    if (venue.price < filterData.minPrice ||
                        venue.price > filterData.maxPrice ||
                        venue.maxGuests < filterData.minGuests ||
                        venue.maxGuests > filterData.maxGuests
                    ) {
                        return false;
                    } 
                    if(filterData.wifi && !venue.meta.wifi){
                        return false;
                    }
                    if (filterData.parking && !venue.meta.parking) {
                        return false;
                    }
              
                    if (filterData.breakfast && !venue.meta.breakfast) {
                        return false;
                    }
              
                    if (filterData.pets && !venue.meta.pets) {
                        return false;
                    }
                    return true;
                });
                console.log(filteredVenues);
                props.updateVenuesToDisplay(filteredVenues)
            }
            }
            
    })
    useEffect(() => {
        if(props.isFilterCleared) {
            formik.resetForm();
        }
    }, [props.isFilterCleared])
  return (
    <div id='filter' className='absolute h-fit w-full md:w-96 p-8 bg-gradient-to-b from-[#125C85] to-[#307095] rounded right-0 top-12 z-30 text-white hidden'>
    <form onSubmit={formik.handleSubmit} className='flex flex-col'>
            <p>Price:</p>
            <div className='flex w-full justify-around mb-4'>
                <div className='flex flex-col w-1/3'>
                    <input type="number" name='minPrice' id='minPrice' className='text-black rounded p-1' min="0" max={formik.values.maxPrice} onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.minPrice}/>
                    <label htmlFor="minPrice">Min $</label>
                </div>
                <div className='flex flex-col w-1/3'>
                    <input type="number" name='maxPrice' id='maxPrice' className='text-black rounded p-1' min={formik.values.minPrice} onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxPrice}/>
                    <label htmlFor="maxPrice">Max $</label>
                </div>
            </div>
            <p>Max guests:</p>
            <div className='flex w-full justify-around mb-4'>
                <div className='flex flex-col w-1/3'>
                    <input type="number" name='minGuests' id='minGuests' className='text-black rounded p-1' min="1" max={formik.values.maxGuests} onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.minGuests}/>
                    <label htmlFor="minGuests">Min</label>
                </div>
                <div className='flex flex-col w-1/3'>
                    <input type="number" id='maxGuests' name='maxGuests' className='text-black rounded p-1' min={formik.values.minGuests} onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxGuests}/>
                    <label htmlFor="maxGuests">Max</label>
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <div>
                    <input type="checkbox" name='wifi' id="wifi" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.wifi}/>
                    <label htmlFor="wifi" className="ml-2">Wifi</label>
                </div>
                <div>
                    <input type="checkbox" name='pets' id="pets" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pets}/>
                    <label htmlFor="pets" className="ml-2">Pets</label>
                </div>
                <div>
                    <input type="checkbox" name='breakfast' id="breakfast" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.breakfast}/>
                    <label htmlFor="breakfast" className="ml-2">Breakfast</label>
                </div>
                <div>
                    <input type="checkbox" name='parking' id="parking" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.parking}/>
                    <label htmlFor="parking" className="ml-2">Parking</label>
                </div>
            </div>
            <button type='submit' className='p-1 w-2/5 mx-auto bg-[#FFC107] text-black rounded shadow'>Apply filter</button>
            <button typeof="button" className="mx-auto mt-4 hover:underline" onClick={props.clearFilter}>Clear filter</button>
    </form>
    </div>
  )
}

export default Filter