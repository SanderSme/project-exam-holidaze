import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useFormik } from "formik"
import * as Yup from 'yup'

const accessToken = localStorage.getItem("accessToken")

const validationSchema = Yup.object().shape({
    name: Yup.string().min(6, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    description: Yup.string().min(6, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    media: Yup.string()
    .url('Invalid URL')
    .matches(/\.(gif|jpe?g|png)$/i, 'Invalid image URL'),
    price: Yup.number().required('Required'),
    maxGuests: Yup.number().required('Required'),
})

const VenueForm = () => {
    const [imgUrlCount, setImgUrlCount] = useState(1);

    const handleAddImgUrl = (e) => {
        e.preventDefault()
      setImgUrlCount(imgUrlCount + 1);
    };

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
                address: "Unknown",
                city: "Unknown",
                zip: "Unknown",
                country: "Unknown",
                continent: "Unknown",
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
                    address: "Unknown",
                    city: "Unknown",
                    zip: "Unknown",
                    country: "Unknown",
                    continent: "Unknown",
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
                {Array.from({ length: imgUrlCount }, (_, i) => (
                  <div className="w-full flex gap-4 mt-4" id={`imgUrl${i}`} key={i}>
                      <input type="text" name='media' id={`title${i}`} className="border-2 border-[#125C85] rounded w-full p-1" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.media}/>
                      <button onClick={(e) => {
                        e.preventDefault();
                        e.target.parentElement.remove();
                        }}><FontAwesomeIcon icon={faTrash}/></button>
                  </div>
                ))}
                <button className="w-12 h-12 rounded-full border-2 border-[#125C85] text-3xl mt-4 font-bold" onClick={handleAddImgUrl}>+</button>
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
            <button type="submit" className="bg-[#FFC107] w-full md:w-1/2 lg:w-1/3 py-1 rounded shadow place-self-end text-black mt-4 mb-8">Publish</button>
        </form>
  )
}

export default VenueForm