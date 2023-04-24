import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroImg4 from '../../assets/HeroImg4.jpg'
import HeroImg3 from '../../assets/HeroImg3.jpg'
import HeroImg2 from '../../assets/HeroImg2.jpg'
import HeroImg1 from '../../assets/HeroImg1.jpg'


const HeroBannerSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      }
  return (
    <>
        <Slider {...settings}>
        <div className='h-[300px] md:h-[500px] relative'>
            <img src={HeroImg4} alt="herobanner" className='w-full h-full object-cover object-center' />
        </div>
        <div className='h-[300px] md:h-[500px] relative'>
            <img src={HeroImg3} alt="herobanner" className='w-full h-full object-cover object-center' />
        </div>
        <div className='h-[300px] md:h-[500px] relative'>
            <img src={HeroImg2} alt="herobanner" className='w-full h-full object-cover object-center' />
        </div>
        <div className='h-[300px] md:h-[500px] relative'>
            <img src={HeroImg1} alt="herobanner" className='w-full h-full object-cover object-center' />
        </div>
        </Slider>
    </>
  )
}

export default HeroBannerSlider