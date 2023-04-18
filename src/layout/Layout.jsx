import Header from "./Header"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className="h-screen flex flex-col justify-between">
    <Header/>
    <main>{children}</main>
    <Footer/>
    </div>
  )
}

export default Layout