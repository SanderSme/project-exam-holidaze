import DummyVenue from '../assets/DummyVenue.jpg'
import HeroBanner from '../assets/HeroBanner.jpg'
import Logo from '../assets/Logo.svg'

const HomePage = () => {
  return (
    <div>
        <div className='w-full h-[400px] relative'>
            <img src={HeroBanner} alt="herobanner" className='w-full h-full object-cover object-top' />
            <div className='absolute inset-0 bg-gradient-to-l from-[#00000000] to-[#00000090]'>
                <div className='max-w-7xl w-11/12 mx-auto'>
                    <div className='h-full flex gap-2 items-end mt-24'>
                        <p className='text-white font-semibold text-4xl'>Welcome to</p>
                        <img src={Logo} alt="logo" className='h-[160px]' />
                    </div>
                </div>
            </div>
        </div>
        <div className='max-w-7xl w-11/12 mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl mt-4'>Venues</h1>
                <button className='px-8 h-[30px] rounded bg-[#125C85] text-white'>Filter</button>
            </div>
            <div className='w-full h-[1px] bg-gray-400 mb-8'>
            </div>
            <div className='flex flex-wrap justify-between gap-4'>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
                <div className='w-[255px] h-[369px] p-2 bg-white rounded mb-16 shadow'>
                    <div className='w-full h-[236px]'>
                        <img src={DummyVenue} alt="venue" className='w-full h-full object-cover rounded' />
                    </div>
                    <div className='flex flex-col h-28 justify-between'>
                        <p className='font-semibold'>Charming Treehouse - Møre & Romsdal, Ålesund</p>
                        <p>Starting from: <span className='font-semibold'>$600</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage