import Logo from '../assets/Logo.svg'

const Header = () => {
  return (
    <div className="w-full h-[120px] bg-[#125C85]">
        <div className="max-w-7xl w-11/12 h-full mx-auto flex flex-col justify-between">
            <div className='h-[70px] w-full flex justify-between items-end relative'>
                <img src={Logo} alt="logo" className='h-full'/>
                <div className='flex items-center gap-2'>
                <div className='h-[30px] w-[410px] bg-[#F5F9FF] rounded absolute left-[50%] translate-x-[-50%] flex justify-center items-center p-1'>
                    <input type="text" className='w-11/12 h-full bg-[#F5F9FF] rounded mr-2' />
                    <button type='button' className='h-[24px] w-[92px] bg-[#125C85] rounded text-white'>Search</button>
                </div>
                    <div className='h-[40px] w-[40px] rounded-full bg-[#FFC107] flex justify-center items-center font-semibold text-xl border border-black'>
                        S
                    </div>
                    <p className='text-white text-lg'>SanderSme</p>
                </div>
            </div>
            <div className='flex gap-6'>
                <p className='h-[30px] w-[95px] bg-[#FFC107] rounded-t-lg flex justify-center items-center'>All venues</p>
                <p className='h-[30px] w-[95px] bg-[#A2D9FF] rounded-t-lg flex justify-center items-center'>All venues</p>
                <p className='h-[30px] w-[95px] bg-[#A2D9FF] rounded-t-lg flex justify-center items-center'>All venues</p>
            </div>
        </div>
    </div>
  )
}

export default Header