import { Route, Routes } from "react-router-dom"
import HomePage from "../components/views/HomePage"
import SingleVenue from "../components/views/SingleVenue"

const Router = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/venue/:id" element={<SingleVenue/>}/>
        </Routes>
    </>
  )
}

export default Router