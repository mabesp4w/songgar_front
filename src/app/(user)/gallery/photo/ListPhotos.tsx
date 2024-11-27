/** @format */
"use client";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { BASE_URL } from "@/services/baseURL";
import usePhotosApi from "@/stores/api/Photos";
import PhotosTypes from "@/types/galleries/PhotosTypes";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
const ListPhoto = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [showSlides, setShowSlides] = useState<never>();
  // store
  const { setPhotosAll, dtPhotos } = usePhotosApi();
  // get photo
  const getPhotos = useCallback(async () => {
    setIsLoading(true);
    await setPhotosAll({});
    setIsLoading(false);
  }, [setPhotosAll]);

  useEffect(() => {
    getPhotos();

    return () => {};
  }, [getPhotos]);

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtPhotos?.data,
        picture: "photo_path",
        title: { path: "title_photo" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtPhotos?.data]);
  return (
    <section className=" my-10">
      {/* lightBox */}
      <LightPlugins
        index={indexBox}
        setIndex={setIndexBox}
        slides={showSlides}
      />
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-y-4 gap-x-4">
          {dtPhotos.data.map((item: PhotosTypes, index) => (
            <div
              key={item.id}
              className="relative flex w-52 lg:w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div
                onClick={setIndexBox ? () => setIndexBox(index) : undefined}
                className="relative cursor-pointer overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
              >
                <Image
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                  src={`${BASE_URL}/${item.photo_path}`}
                  alt="profile-picture"
                />
              </div>
              <div className="text-center">
                <h4 className="mb-2 mt-2">{item?.title_photo}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListPhoto;
