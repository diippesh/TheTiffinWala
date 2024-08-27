import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules

import Navbar from './Navbar';
import Footer from './Footer';
import img1 from '../images/chooseus-1.jpg';
const Ourteamslider=()=>{
 return (
    <>
  
    <div className=" my-5">
     <h3 className="text-center text-3xl py-5" style={{fontFamily:"cursive"}}>Our Team</h3>
      
     <Swiper spaceBetween={30}
        loop={true}
        speed={900}
        autoplay={{
          delay: 3500,
        }}
        navigation={true}
        slidesPerView={1}
        modules={[Autoplay,Navigation]}
        className="mySwiper" >
        <SwiperSlide>
            <div className=" flex flex-col items-center text-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3WSuQ7LbKzNkhuP4fgs9__y1afXu1otF2A&s" alt="teammember img" style={{width:"11.4rem",borderRadius:"50%"}}/>
                <h4 className="mt-2 text-xl font-medium">Deepesh Bhatiya</h4>
                 <p >Developer</p>
                 <p className="px-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptatibus consequatur veritatis harum sunt sapiente! Ratione quae, officiis adipisci dolorem mollitia nihil at voluptatibus.</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className=" flex flex-col items-center text-center">
                <img src="https://media.licdn.com/dms/image/v2/C4D03AQEMB8DZh75uZQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1661534351686?e=1729123200&v=beta&t=Yh9rc4TN6xCmUXaEkK5zvk02sWuT4IhcePR_R18xwlw" alt="teammember img" style={{width:"11.4rem",borderRadius:"50%"}}/>
                <h4 className="mt-2 text-xl font-medium">Anshul Parihar</h4>
                 <p >Developer</p>
                 <p className="px-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptatibus consequatur veritatis harum sunt sapiente! Ratione quae, officiis adipisci dolorem mollitia nihil at voluptatibus.</p>
            </div>
        </SwiperSlide>
       
      </Swiper>
      </div>
    </>
 );
};
export default Ourteamslider;