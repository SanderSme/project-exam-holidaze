import { useState } from "react"


const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")
    const fetchData = (value) => {
        fetch('https://nf-api.onrender.com/api/v1/holidaze/venues').then((response) => response.json()).then((json) => {
            const results = json.filter((venue) => {
                return value && venue && venue.name && venue.name.toLowerCase().includes(value)
            })
            setResults(results)
        })
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
  return (
    <div className='h-[30px] w-[300px] sm:w-[350px] lg:w-[410px] bg-[#F5F9FF] rounded absolute left-[50%] translate-x-[-50%] top-20 md:top-auto flex items-center p-1'>
        <input type="text" name="search" value={input} onChange={(e) => handleChange(e.target.value)} className='w-11/12 h-full bg-[#F5F9FF] rounded mr-2' />
        <button type='button' className='h-[24px] w-[92px] bg-[#125C85] rounded text-white'>Search</button>
    </div>
  )
}

export default SearchBar