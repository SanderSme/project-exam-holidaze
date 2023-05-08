import { BrowserRouter } from "react-router-dom"
import Layout from "../src/components/layout/Layout"
import Router from "./router/Router"
import { useSelector } from "react-redux"
import Loader from "./components/layout/Loader"

function App() {
  const {isLoading} = useSelector(state => state.loader)
  return (
    <>
    <BrowserRouter>
      <Layout>
        <Router/>
        {isLoading && <Loader/>}
      </Layout>
    </BrowserRouter>
    </>
  )
}

export default App
