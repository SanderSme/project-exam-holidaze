import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

const VenueGallery = (props) => {
    const [numInputs, setNumInputs] = useState(0);
    const handleAddInput = () => {
        setNumInputs(numInputs + 1);
    }

    const inputs = [];
    for (let i = 0; i <= numInputs; i++) {
        const inputName = `media-${i}`;
        inputs.push(
        <div className="w-full flex gap-4 mt-4" key={i}>
            <input
            type="text"
            name={inputName}
            className="border-2 border-[#125C85] rounded w-full p-1"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values[inputName] || ''}
            />
            <button type='button'><FontAwesomeIcon icon={faTrash}/></button>
        </div>
        );
        if (props.touched && props.errors) {
        inputs.push(
            <div className='text-red-600' key={`error-${i}`}>
            {props.errors[inputName]}
            </div>
        );
        }
    }
  return (
    <div className="flex flex-col items-start">
        <label htmlFor="gallery" className='mb-[-16px]'>Gallery</label>
        {inputs}
        <button type='button' className="px-3 py-1 rounded-full border-2 border-[#125C85] text-3xl mt-4 font-bold" onClick={handleAddInput}>+</button>
    </div>
  )
}

export default VenueGallery