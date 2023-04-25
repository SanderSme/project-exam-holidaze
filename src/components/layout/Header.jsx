import Logo from '../../assets/Logo.svg'
import HeaderDesktopNavBar from './HeaderDesktopNavBar'
import HamburgerMenu from './HeaderHamburgerMenu'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavBarAnimation.css'
import SearchBar from '../SearchBar'
import { useDispatch } from 'react-redux'
import { fetchVenues } from '../../store/modules/venuesSlice'
import { useState, useEffect} from 'react'
import SearchResults from '../SearchResultList'
import { NavLink } from 'react-router-dom'

const Header = () => {
    function displayNavBar() {
        document.getElementById("navBar").classList.toggle("translate-x-0")
        document.getElementById("navBar").classList.toggle("-translate-x-full")
        document.getElementById("burgerBtn").classList.toggle("bg-[#F5F9FF]")
        document.getElementById("burgerBtn").classList.toggle("text-[#125C85]")
        document.getElementById("burgerBtn").classList.toggle("text-[#F5F9FF]")
        document.querySelector('body').classList.toggle("overflow-hidden")
      }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchVenues())
    }, [dispatch])
      const [results, setResults] = useState([])

      const accessToken = localStorage.getItem('accessToken')
      const userName = localStorage.getItem('userName')
      const avatar = localStorage.getItem('avatar')
      let firstChar
      if(userName) {
          firstChar = userName['0'].toUpperCase()
      }
      let userAvatar
      if(avatar) {
          userAvatar = <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full"/>
      } else {
          userAvatar = firstChar
      }
  return (
    <div className="w-full h-28 bg-[#125C85]">
        <div className="max-w-7xl w-11/12 h-full mx-auto flex flex-col justify-between">
            <div className='h-[70px] w-full flex justify-between items-center md:items-end relative'>
                <button className='h-10 w-10 p-1 text-[#F5F9FF] rounded md:hidden' id='burgerBtn' onClick={displayNavBar}>
                    <FontAwesomeIcon icon={faBars} className='w-full h-full'/>
                </button>
                <img src={Logo} alt="logo" className='h-full absolute md:relative left-[50%] translate-x-[-50%] md:left-auto md:translate-x-0'/>
                <div className='flex items-center gap-2'>
                <SearchBar setResults={setResults}/>
                <SearchResults results={results}/>
                {accessToken ? (
              <NavLink to={"/profile"} className="flex items-center gap-2">
                <div className='h-[40px] w-[40px] rounded-full bg-[#FFC107] flex justify-center items-center font-semibold text-xl border border-black'>
                  {userAvatar}
                </div>
                <p className='text-white text-lg hidden md:flex'>{userName}</p>
              </NavLink>
            ) : (
              <><NavLink to={"/login"} className="text-white text-lg hidden md:flex">Sign in</NavLink><span className='text-white hidden md:flex'>/</span><NavLink to={'/register'} className="text-white text-lg hidden md:flex">Register</NavLink></>
            )}
                </div>
            </div>
            <HeaderDesktopNavBar/>
            <HamburgerMenu/>
        </div>
    </div>
  )
}

export default Header