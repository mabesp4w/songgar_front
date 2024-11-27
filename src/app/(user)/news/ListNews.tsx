/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import React, { useCallback, useEffect, useState } from "react";
import useNewsApi from "@/stores/api/News";
import NewsTypes from "@/types/NewsTypes";
import DOMPurify from "dompurify";
import { momentId } from "@/utils/momentIndonesia";
import DetailNews from "./DetailNews";
import Image from "next/image";
import { BASE_URL } from "@/services/baseURL";
const ListNews = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const { setNewsAll, dtNews } = useNewsApi();
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState<NewsTypes | null>(null);
  // get news
  const news = useCallback(async () => {
    setIsLoading(true);
    await setNewsAll({});
    setIsLoading(false);
  }, [setNewsAll]);

  useEffect(() => {
    news();

    return () => {};
  }, [news]);

  const openDetail = (row: NewsTypes) => {
    setRow(row);
    setShowModal(true);
  };

  return (
    <section className=" my-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      <DetailNews
        setShowModal={setShowModal}
        showModal={showModal}
        news={row ?? null}
      />
      {!isLoading && (
        <div className="grid grid-cols-1 gap-y-10 justify-center">
          {dtNews.data.map((item: NewsTypes) => {
            // fungsi untuk membatasi jumlah karakter
            const limitContentLength = (content: string, maxLength: number) => {
              if (content.length > maxLength) {
                return content.slice(0, maxLength) + "..."; // tambahkan "..." jika konten terlalu panjang
              }
              return content;
            };
            const limitedContent = limitContentLength(item.content, 300);
            const cleanContent = DOMPurify.sanitize(limitedContent);

            return (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className="px-4 gap-y-2  gap-x-4 flex w-full cursor-pointer rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
              >
                <div className="w-96 cursor-pointer overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <Image
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                    src={`${BASE_URL}/${item.img_news}`}
                    alt="profile-picture"
                  />
                </div>
                <div>
                  {/* judul */}
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <h4>
                    {item?.author ? `${item?.author} - ` : ""}{" "}
                    {momentId(item.news_date).format("DD MMMM YYYY")}{" "}
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                    className="prose h-full  overflow-hidden"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ListNews;
