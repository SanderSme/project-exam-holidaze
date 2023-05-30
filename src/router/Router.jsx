import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "../components/views/HomePage"
import SingleVenue from "../components/views/SingleVenue"
import Register from "../components/views/Register"
import Login from "../components/views/Login"
import NewVenue from "../components/views/NewVenue"
import Profile from "../components/views/Profile"
import UpdateVenue from "../components/views/UpdateVenue"
import SearchResults from "../components/views/SearchResults"
import PageNotFound from "../components/views/PageNotFound"

function checkLogedInUser(component) {
  const accessToken = localStorage.getItem('accessToken');
  const loggedIn = Boolean(accessToken);

  return loggedIn ? component : <Navigate to="/login" />;
}

const Router = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/venue/:id" element={<SingleVenue/>}/>
            <Route path="/profile" element={checkLogedInUser(<Profile/>)}/>
            <Route path="/create-venue" element={checkLogedInUser(<NewVenue/>)}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/update/:id" element={checkLogedInUser(<UpdateVenue/>)}/>
            <Route path="/search-results" element={<SearchResults/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </>
  )
}

export default Router