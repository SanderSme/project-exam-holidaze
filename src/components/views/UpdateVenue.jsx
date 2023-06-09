import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { fetchSingleVenue, updateVenue} from '../../store/modules/venuesSlice'
import { useParams } from "react-router-dom"
import { setLoadingState } from "../../store/modules/loaderSlice"
import { Link } from "react-router-dom"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(6, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.required('Required'),
	description: Yup.string()
		.min(6, 'Must be 6 chars or more')
		.max(
			2000,
			'Can not be longer than 2000 chars'
		)
		.required('Required'),
	media: Yup.string()
		.url('Invalid URL')
		.matches(
			/\.(gif|jpe?g|png)(\?.*)*$/i,
			'Invalid image URL'
		),
	price: Yup.number().required('Required'),
	maxGuests: Yup.number().required('Required'),
	address: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('optional'),
	continent: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('optional'),
	country: Yup.string()
		.min(2, 'Must be 6 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('optional'),
	city: Yup.string()
		.min(2, 'Must be 2 chars or more')
		.max(50, 'Can not be longer than 50 chars')
		.optional('optional'),
	zip: Yup.string().optional('optional'),
        })

const UpdateVenue = () => {
    const dispatch = useDispatch()
    let {id} = useParams()
    const venueToUpdate = useSelector((state) => state.venues.singleVenue)
    const userName = localStorage.getItem('userName')
    useEffect(() => {
        if(!venueToUpdate) {
            dispatch(fetchSingleVenue(id))
        }
    }, [dispatch, id, venueToUpdate])
    
    const [mediaArray, setMediaArray] = useState(venueToUpdate ? venueToUpdate.media : [])

    useEffect(() => {
        if(venueToUpdate && venueToUpdate.media) {
            setMediaArray(venueToUpdate.media)
        }
    }, [venueToUpdate])

    const formik = useFormik({
        initialValues: {
            name: venueToUpdate?.name || "",
            description: venueToUpdate?.description || "",
            price: venueToUpdate?.price || 0,
            maxGuests: venueToUpdate?.maxGuests || "",
            rating: venueToUpdate?.rating || 5,
            meta: {
                wifi: venueToUpdate?.meta.wifi || false,
                parking: venueToUpdate?.meta.parking || false,
                breakfast: venueToUpdate?.meta.breakfast || false,
                pets: venueToUpdate?.meta.pets || false,
            },
            location: {
                address: venueToUpdate?.location.address || "",
                city: venueToUpdate?.location.city || "",
                zip: venueToUpdate?.location.zip || "",
                country: venueToUpdate?.location.country || "",
                continent: venueToUpdate?.location.continent || "",
                lat: 0,
                lng: 0,
            }
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            const venueData = {
                name: values.name,
                description: values.description,
				media: mediaArray,
				price: values.price,
				maxGuests: values.maxGuests,
				rating: values.rating,
				meta: {
					wifi: values.meta.wifi,
					parking: values.meta.parking,
					breakfast: values.meta.breakfast,
					pets: values.meta.pets,
				},
				location: {
					address: values.location.address,
					city: values.location.city,
					zip: values.location.zip,
					country: values.location.country,
					continent: values.location.continent,
					lat: 0,
					lng: 0,
				},
            }
            dispatch(setLoadingState(true))

            dispatch(updateVenue(id, venueData))
                .then(() => {
                    dispatch(setLoadingState(false))
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setLoadingState(false))
                })
        }
    })

    useEffect(() => {
        if(venueToUpdate) {
            setMediaArray(venueToUpdate.media)
        }
    }, [venueToUpdate])

    useEffect(() => {
        if(id) {
            dispatch(fetchSingleVenue(id)).catch((error) => {
                console.log(error);
            })
        }
    }, [dispatch, id])

    function pushToMediaArray() {
                const mediaValue = document.getElementById('media').value
                const urlRegex = /(ftp|http|https):\/\/[^ "]+$/;
                if(urlRegex.test(mediaValue)) {
                    const newMediaArray = [...mediaArray, mediaValue];
                    setMediaArray(newMediaArray);
                    document.getElementById('media').value = '';
                } else {
                     return null
                }
                    
    }

    function deleteMedia(media) {
                const newMediaArray = mediaArray.filter((item) => item !== media);
                setMediaArray(newMediaArray);
    }

  return (
   

    <div className="max-w-7xl w-11/12 mx-auto mt-32">
        {venueToUpdate && venueToUpdate.owner.name === userName ? <>
                <div>
                    <h1 className='text-2xl mt-8'>Update Venue</h1>
                </div>
                <div className='w-full h-[1px] bg-gray-300 mb-8'></div>
                <form onSubmit={formik.handleSubmit} className="w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-8 text-[#125C85]">
                        <div className="flex flex-col">
                            <label htmlFor="name">Title</label>
                            <input 
                                type="text" 
                                name='name' 
                                id="name" 
                                className="border-2 border-[#125C85] rounded p-1" 
                                onChange={formik.handleChange}
                                value={formik.values.name}/>
                            {formik.touched.name && formik.errors.name ? <div className='text-red-600'>{formik.errors.name}</div> : null}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name='description' 
                                className="border-2 border-[#125C85] rounded h-32 p-1" 
                                onChange={formik.handleChange}
                                value={formik.values.description}/>
                                {formik.touched.description && formik.errors.description ? <div className='text-red-600'>{formik.errors.description}</div> : null}
                        </div>
                        <div className="flex flex-col items-start">
                            <label htmlFor="gallery" className='mb-[-16px]'>Gallery</label>
                            {mediaArray && 
                                <div className='flex gap-1 flex-wrap mt-4'>
                                    {mediaArray.map((media) => (
                                        <div key={media} className='w-24 h-24 bg-gray-200 rounded relative'>
                                            <img src={media} alt="gallery" className='w-full h-full object-cover rounded' />
                                            <button type='button' onClick={() => deleteMedia(media)} className='flex justify-center items-center absolute top-[-4px] right-[-4px] h-4 w-4 bg-gray-200 rounded-full text-sm'>x</button>
                                        </div>
                                    ))}
                                </div>
                            }
                            <div className="w-full flex gap-4 mt-4">
                                <input 
                                    type="text" 
                                    name='media' 
                                    id='media' 
                                    className="border-2 border-[#125C85] rounded w-full p-1" 
                                    onChange={formik.handleChange}/>
                            </div>
                            {formik.touched.media && formik.errors.media ? <div className='text-red-600'>{formik.errors.media}</div> : null}
                            <button type='button' onClick={pushToMediaArray} className="px-3 py-1 rounded bg-[#125C85] hover:text-black hover:bg-[#A2D9FF] text-white mt-4 font-semibold place-self-end">Add</button>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col w-2/5">
                                <label htmlFor="pricePerNight">Price per night</label>
                                <input 
                                    type="number" 
                                    name='price' 
                                    id="pricePerNight" 
                                    className="border-2 border-[#125C85] rounded p-1" 
                                    onChange={formik.handleChange}
                                    value={formik.values.price}/>
                            {formik.touched.price && formik.errors.price ? <div className='text-red-600'>{formik.errors.price}</div> : null}
                        </div>
                        <div className="flex flex-col w-2/5">
                            <label htmlFor="maxGuests">Max guests</label>
                            <input 
                                type="number" 
                                name='maxGuests' 
                                id="maxGuests" 
                                className="border-2 border-[#125C85] rounded p-1" 
                                onChange={formik.handleChange}
                                value={formik.values.maxGuests}/>
                            {formik.touched.maxGuests && formik.errors.maxGuests ? <div className='text-red-600'>{formik.errors.maxGuests}</div> : null}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <input type="checkbox" name='meta.wifi' id="wifi" onChange={formik.handleChange}
                                value={formik.values.meta.wifi}/>
                            <label htmlFor="wifi" className="ml-2">Wifi</label>
                        </div>
                        <div>
                            <input type="checkbox" name='meta.pets' id="pets" onChange={formik.handleChange}
                                value={formik.values.meta.pets}/>
                            <label htmlFor="pets" className="ml-2">Pets</label>
                        </div>
                        <div>
                            <input type="checkbox" name='meta.breakfast' id="breakfast" onChange={formik.handleChange}
                                value={formik.values.meta.breakfast}/>
                            <label htmlFor="breakfast" className="ml-2">Breakfast</label>
                        </div>
                        <div>
                            <input type="checkbox" name='meta.parking' id="parking" onChange={formik.handleChange}
                                value={formik.values.meta.parking}/>
                            <label htmlFor="parking" className="ml-2">Parking</label>
                        </div>
                    </div>
                    <div className='p-2 bg-white rounded flex flex-col gap-4'>
                        <div className="flex flex-col">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                name='location.address' 
                                id="address" 
                                className="border-2 border-[#125C85] rounded p-1" 
                                onChange={formik.handleChange}
                                value={formik.values.location.address}/>
                            {formik.touched.address && formik.errors.address ? <div className='text-red-600'>{formik.errors.address}</div> : null}
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col w-2/5">
                                <label htmlFor="city">City</label>
                                <input 
                                    type="text"    
                                    name='location.city' id="city" 
                                    className="border-2 border-[#125C85] rounded p-1" 
                                    onChange={formik.handleChange}
                                    value={formik.values.location.city}/>
                                {formik.touched.city && formik.errors.city ? <div className='text-red-600'>{formik.errors.city}</div> : null}
                            </div>
                            <div className="flex flex-col w-2/5">
                                <label htmlFor="zip">Zip-code</label>
                                <input 
                                    type="text" 
                                    name='location.zip' 
                                    id="zip" 
                                    className="border-2 border-[#125C85] rounded p-1" 
                                    onChange={formik.handleChange}
                                    value={formik.values.location.zip}/>
                                {formik.touched.zip && formik.errors.zip ? <div className='text-red-600'>{formik.errors.zip}</div> : null}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col w-2/5">
                                <label htmlFor="country">Country</label>
                                <input 
                                    type="text" 
                                    name='location.country' 
                                    id="country" 
                                    className="border-2 border-[#125C85] rounded p-1" 
                                    onChange={formik.handleChange}
                                    value={formik.values.location.country}/>
                                {formik.touched.country && formik.errors.country ? <div className='text-red-600'>{formik.errors.country}</div> : null}
                            </div>
                            <div className="flex flex-col w-2/5">
                                <label htmlFor="continent">Continent</label>
                                <input 
                                    type="text" 
                                    name='location.continent' 
                                    id="continent" 
                                    className="border-2 border-[#125C85] rounded p-1" 
                                    onChange={formik.handleChange}
                                    value={formik.values.location.continent}/>
                                {formik.touched.continent && formik.errors.continent ? <div className='text-red-600'>{formik.errors.continent}</div> : null}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-[#FFC107] w-full md:w-1/2 lg:w-1/3 py-1 rounded shadow place-self-end text-black mt-4 mb-8">Save changes</button>
                </form>
            </> : 
            <div className="text-center mt-12 mb-80">
                <p className="mb-4 text-lg">You are not the owner of this venue</p>
                <Link to={"/"} className='underline text-blue-600 italic'>Back to Homepage</Link>
            </div>
            
        } 
    </div>
  )
}

export default UpdateVenue