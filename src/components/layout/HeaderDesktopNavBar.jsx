import { NavLink } from "react-router-dom"

const linkStyles = "h-8 w-[95px] bg-[#A2D9FF] rounded-t-lg flex justify-center items-center"
const activeLinkStyles = "h-8 w-[95px] bg-[#FFC107] rounded-t-lg flex justify-center items-center font-semibold"
const venueManager = localStorage.getItem('venueManager')
const accessToken = localStorage.getItem('accessToken')
const HeaderDesktopNavBar = () => {
  return (
    <div className='flex gap-6 mt-2 hidden md:flex'>
              <NavLink to={"/"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>All venues
              </NavLink>
              {accessToken ? <NavLink to={"/profile"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>Profile
              </NavLink> : null}
              
              {venueManager === 'true' ? <NavLink to={"/create-venue"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>New venue
              </NavLink> : null}
              
            </div>
  )
}

export default HeaderDesktopNavBar