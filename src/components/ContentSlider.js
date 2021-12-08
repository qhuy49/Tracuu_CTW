import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Autoplay } from "swiper";

SwiperCore.use([Autoplay]);

export default function ContentSlider() {
  var baseUrl = "";
  if (document.location.port === "3000") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = process.env.PUBLIC_URL;
  }
  const imgData = [
    baseUrl + "/LibCustom/img/1.jpg",
    baseUrl + "/LibCustom/img/2.jpg",
    baseUrl + "/LibCustom/img/3.jpg",
    baseUrl + "/LibCustom/img/4.jpg",
    baseUrl + "/LibCustom/img/5.jpg",
    baseUrl + "/LibCustom/img/6.jpg",
    baseUrl + "/LibCustom/img/7.jpg",
    baseUrl + "/LibCustom/img/8.jpg",
    baseUrl + "/LibCustom/img/9.jpg",
    baseUrl + "/LibCustom/img/10.jpg",
    baseUrl + "/LibCustom/img/11.jpg",
    baseUrl + "/LibCustom/img/12.jpg",
  ];
  return (
    <React.Fragment>
      <Swiper
        breakpoints={{
          240: {
            width: 240,
            slidesPerView: 1,
          },
          320: {
            width: 320,
            slidesPerView: 1,
          },
          480: {
            width: 480,
            slidesPerView: 2,
          },
          640: {
            width: 640,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 3,
          },
          992: {
            width: 992,
            slidesPerView: 5,
          },
          1200: {
            width: 1200,
            slidesPerView: 7,
          },
        }}
        id="main"
        width="480"
        spaceBetween={1}
        slidesPerView={7}
        loop={true}
        autoplay={true}
        className="mySwiper"
      >
        {
          imgData.map((s ,keys) => (
            <SwiperSlide key = {keys}>
              <img src = {`${s}`}></img>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div id="bp-wrapper"></div>
    </React.Fragment>
  );
}
