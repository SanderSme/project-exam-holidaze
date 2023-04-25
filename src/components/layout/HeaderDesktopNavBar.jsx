import { NavLink } from "react-router-dom"

const linkStyles = "h-8 w-[95px] bg-[#A2D9FF] rounded-t-lg flex justify-center items-center"
const activeLinkStyles = "h-8 w-[95px] bg-[#FFC107] rounded-t-lg flex justify-center items-center font-semibold"

const HeaderDesktopNavBar = () => {
  return (
    <div className='flex gap-6 mt-2 hidden md:flex'>
              <NavLink to={"/"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>All venues
              </NavLink>
              <NavLink to={"/profile"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>Profile
              </NavLink>
              <NavLink to={"/create-venue"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles}>New venue
              </NavLink>
            </div>
  )
}

export default HeaderDesktopNavBar