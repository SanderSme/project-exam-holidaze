import Logo from '../../assets/Logo.svg'

const Footer = () => {
  return (
    <div className="h-fit w-full bg-[#125C85]">
        <div className="max-w-7xl w-11/12 mx-auto flex flex-col gap-2 items-center">
            <img src={Logo} alt="logo" className='w-[150px] md:w-[242px]'/>
            <p className='text-white text-xl md:text-3xl italic'>Your perfect stay, just a click away</p>
            <p className='text-white mt-20'>Copyright © 2023 Sander Smedbøl. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer