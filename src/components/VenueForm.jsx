import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useFormik } from "formik"
import * as Yup from 'yup'

const accessToken = localStorage.getItem("accessToken")

const validationSchema = Yup.object().shape({
    name: Yup.string().min(6, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    description: Yup.string().min(6, "Must be 6 chars or more").max(250, "Can not be longer than 50 chars").required('Required'),
    media: Yup.string()
    .url('Invalid URL')
    .matches(/\.(gif|jpe?g|png)$/i, 'Invalid image URL'),
    price: Yup.number().required('Required'),
    maxGuests: Yup.number().required('Required'),
    address: Yup.string().min(2, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    continent: Yup.string().min(2, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    country: Yup.string().min(2, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    city: Yup.string().min(2, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    zip: Yup.number().required('Required'),
})

const VenueForm = () => {
    const formik = useFormik({
        initialValues:{
            name: "",
            description: "",
            media: [],
            price: 1,
            maxGuests: 1,
            rating: 5,
            meta: {
                wifi: false,
                parking: false,
                breakfast: false,
                pets: false
            },
            location: {
                address: "",
                city: "",
                zip: "",
                country: "",
                continent: "",
                lat: 0,
                lng: 0
              }
        },
        validationSchema,
        onSubmit: (values) => {
            const venueData = {
                name: values.name,
                description: values.description,
                media: [values.media],
                price: values.price,
                maxGuests: values.maxGuests,
                rating: 5,
                meta: {
                    wifi: values.wifi,
                    parking: values.parking,
                    breakfast: values.breakfast,
                    pets: values.pets
                },
                location: {
                    address: values.address,
                    city: values.city,
                    zip: values.zip,
                    country: values.country,
                    continent: values.continent,
                    lat: 0,
                    lng: 0
                  }
              };
              console.log(venueData);
              fetch('https://nf-api.onrender.com/api/v1/holidaze/venues', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`
                  },
                  body: JSON.stringify(venueData)
              })
              .then(response => {
                  if(!response.ok) {
                      throw new Error(response.statusText)
                  }
                  return response.json()
              })
              .then(data => {
                  console.log(data);
                window.location.href = '/';
              })
              .catch(error => {
                  console.error(error)
              })
        }
    })

  return (
        <form onSubmit={formik.handleSubmit} className="w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-8 text-[#125C85]">
            <div className="flex flex-col">
                <label htmlFor="name">Title</label>
                <input type="text" name='name' id="name" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}/>
                        {formik.touched.name && formik.errors.name ? <div className='text-red-600'>{formik.errors.name}</div> : null}
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea id="description" name='description' className="border-2 border-[#125C85] rounded h-32 p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}/>
                        {formik.touched.description && formik.errors.description ? <div className='text-red-600'>{formik.errors.description}</div> : null}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="gallery" className='mb-[-16px]'>Gallery</label>
                    <div className="w-full flex gap-4 mt-4">
                        <input type="text" name='media' className="border-2 border-[#125C85] rounded w-full p-1" onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                        <button type='button'><FontAwesomeIcon icon={faTrash}/></button>
                    </div>
                <button type='button' className="w-12 h-12 rounded-full border-2 border-[#125C85] text-3xl mt-4 font-bold">+</button>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5">
                    <label htmlFor="pricePerNight">Price per night</label>
                    <input type="number" name='price' id="pricePerNight" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}/>
                        {formik.touched.price && formik.errors.price ? <div className='text-red-600'>{formik.errors.price}</div> : null}
                </div>
                <div className="flex flex-col w-2/5">
                    <label htmlFor="maxGuests">Max guests</label>
                    <input type="number" name='maxGuests' id="maxGuests" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxGuests}/>
                        {formik.touched.maxGuests && formik.errors.maxGuests ? <div className='text-red-600'>{formik.errors.maxGuests}</div> : null}
                </div>
            </div>
            <div className="flex flex-col gap-4">
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
            <div className='p-2 bg-gray-100 rounded flex flex-col gap-4'>
            <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <input type="text" name='address' id="address" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}/>
                        {formik.touched.address && formik.errors.address ? <div className='text-red-600'>{formik.errors.address}</div> : null}
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5">
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' id="city" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}/>
                        {formik.touched.city && formik.errors.city ? <div className='text-red-600'>{formik.errors.city}</div> : null}
                </div>
                <div className="flex flex-col w-2/5">
                    <label htmlFor="zip">Zip-code</label>
                    <input type="text" name='zip' id="zip" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zip}/>
                        {formik.touched.zip && formik.errors.zip ? <div className='text-red-600'>{formik.errors.zip}</div> : null}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5">
                    <label htmlFor="country">Country</label>
                    <input type="text" name='country' id="country" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}/>
                        {formik.touched.country && formik.errors.country ? <div className='text-red-600'>{formik.errors.country}</div> : null}
                </div>
                <div className="flex flex-col w-2/5">
                    <label htmlFor="continent">Continent</label>
                    <input type="text" name='continent' id="continent" className="border-2 border-[#125C85] rounded p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.continent}/>
                        {formik.touched.continent && formik.errors.continent ? <div className='text-red-600'>{formik.errors.continent}</div> : null}
                </div>
            </div>
            </div>
            <button type="submit" className="bg-[#FFC107] w-full md:w-1/2 lg:w-1/3 py-1 rounded shadow place-self-end text-black mt-4 mb-8">Publish</button>
        </form>
  )
}

export default VenueForm