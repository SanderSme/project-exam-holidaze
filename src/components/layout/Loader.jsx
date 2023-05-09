import './LoaderAnimation.css'

const Loader = () => {
    return (
      <>
          <div className="fixed bottom-0 left-0 right-0 top-28 w-full h-screen z-50 overflow-hidden bg-black opacity-70 flex flex-col items-center justify-center">
              <div className="loader">
      <div className="plane">
        <img src="https://zupimages.net/up/19/34/4820.gif" className="plane-img"/>
      </div>
      <div className="earth-wrapper">
        <div className="earth"></div>
      </div>  
    </div>
    </div>
      </>
    )
  }
  
  export default Loader