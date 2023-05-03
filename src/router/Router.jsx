import { Route, Routes } from "react-router-dom"
import HomePage from "../components/views/HomePage"
import SingleVenue from "../components/views/SingleVenue"
import Register from "../components/views/Register"
import Login from "../components/views/Login"
import NewVenue from "../components/views/NewVenue"
import Profile from "../components/views/Profile"

const Router = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/venue/:id" element={<SingleVenue/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/create-venue" element={<NewVenue/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </>
  )
}

export default Router