/** @format */
"use client";
import { FC, useCallback, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./style.css";

// import required modules
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { BASE_URL } from "@/services/baseURL";
import useSlidesApi from "@/stores/api/Slides";
import SlidesTypes from "@/types/SlidesTypes";
type Props = {
  perView?: number;
};

const Sliders: FC<Props> = () => {
  // slides
  const { setSlidesAll, dtSlides } = useSlidesApi();
  const fetchData = useCallback(() => {
    setSlidesAll({ search: "" });
  }, [setSlidesAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    dtSlides.length > 0 && (
      <Swiper
        spaceBetween={5}
        autoplay={{
          delay: 5000,
        }}
        effect={"coverflow"}
        loop={true}
        modules={[Autoplay, EffectCoverflow]}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 150,
          modifier: 3,
          slideShadows: true,
        }}
        className="mySwiper"
      >
        {dtSlides?.length > 0 &&
          dtSlides?.map((item: SlidesTypes) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-full">
                <Image
                  src={`${BASE_URL}/${item.img_slide}`}
                  alt="slider"
                  fill
                  sizes={
                    "100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    )
  );
};

export default Sliders;
