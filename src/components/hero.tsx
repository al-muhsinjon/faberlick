"use client";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { carouselData } from "@/constants";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="px-[4%] my-14 hidden md:hidden lg:flex">
      <div className="relative w-full">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          autoplay
          pagination={{ el: ".swiper-pagination", type: "bullets" }}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-[90%] h-[520px]"
        >
          {carouselData.map((carousel) => (
            <SwiperSlide
              key={carousel.id}
              className="bg-green-300 flex justify-center relative items-center"
            >
              <Link href={carousel.href}>
                <Image
                  src={carousel.img}
                  alt=""
                  fill
                  className="object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev bg-main p-6 after:!text-xl rounded-xl after:text-white"></div>
        <div className="swiper-button-next bg-main !p-6 after:!text-xl rounded-xl after:text-white"></div>
        <div className="swiper-pagination after:!absolute !-bottom-6"></div>
      </div>
    </div>
  );
};

export default Hero;
