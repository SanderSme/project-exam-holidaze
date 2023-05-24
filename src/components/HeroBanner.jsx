import Logo from '../assets/Logo.svg'
import HeroBannerSlider from './HeroBannerSlider'

const HeroBanner = () => {
  return (
    <div className='w-full h-[300px] md:h-[500px] relative overflow-x-hidden overflow-y-hidden'>
            <HeroBannerSlider/>
            <div className='absolute inset-0 flex md:items-center bg-gradient-to-b md:bg-gradient-to-l from-[#00000000] to-[#00000090]'>
                <div className='max-w-7xl w-11/12 mx-auto mb-8 justify-center flex md:justify-start'>
                    <div className='h-full flex gap-2 items-end'>
                        <p className='text-white font-semibold text-xl md:text-4xl'>Welcome to</p>
                        <img src={Logo} alt="logo" className='h-[110px] md:h-[160px]' />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default HeroBanner