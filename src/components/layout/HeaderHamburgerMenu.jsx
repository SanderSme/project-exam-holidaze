import { NavLink } from "react-router-dom"

const linkStyles = "p-4 text-lg hover:underline"
const activeLinkStyles = linkStyles + "font-bold underline"
const venueManager = localStorage.getItem('venueManager')
const accessToken = localStorage.getItem('accessToken')

const HamburgerMenu = (props) => {
  return (
    <div className="absolute left-0 right-0 top-[110px] h-screen bg-[#307095] z-50  transform -translate-x-full" id="navBar">
      <ul className="w-11/12 mx-auto flex flex-col gap-10 text-white mt-8">
              <NavLink to={"/"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles} onClick={props.displayNavBar}>All venues
              </NavLink>
              {accessToken ? <NavLink to={"/profile"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles} onClick={props.displayNavBar}>Profile
              </NavLink> : <NavLink to={"/login"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles} onClick={props.displayNavBar}>Sign in
              </NavLink>}
              
              {venueManager === 'true' ? <NavLink to={"/create-venue"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles} onClick={props.displayNavBar}>New venue
              </NavLink> : null}
              {!accessToken ? <NavLink to={"/register"}
                className={({isActive}) => isActive ? activeLinkStyles : linkStyles} onClick={props.displayNavBar}>Register
              </NavLink> : null}
              
      </ul>
    </div>
  )
}

export default HamburgerMenu