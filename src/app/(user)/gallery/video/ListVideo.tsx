/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import ReactPlayer from "react-player";
import React, { useCallback, useEffect, useState } from "react";
import useVideosApi from "@/stores/api/Videos";
import VideosTypes from "@/types/galleries/VideosTypes";
const ListVideo = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const { setVideosAll, dtVideos } = useVideosApi();
  // get videos
  const getVideos = useCallback(async () => {
    setIsLoading(true);
    await setVideosAll({});
    setIsLoading(false);
  }, [setVideosAll]);

  useEffect(() => {
    getVideos();

    return () => {};
  }, [getVideos]);

  console.log({ dtVideos });
  return (
    <section className=" my-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-4 justify-center">
          {dtVideos.data.map((item: VideosTypes) => (
            <div
              key={item.id}
              className="relative flex w-96 h-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative h-full cursor-pointer overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <ReactPlayer
                  url={item.youtube_url}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="text-center">
                <h4 className="mb-2 mt-2">{item?.title_video}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListVideo;
