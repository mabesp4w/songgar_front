/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import React, { useCallback, useEffect, useState } from "react";
import useAnnouncementsApi from "@/stores/api/Announcements";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";
import DOMPurify from "dompurify";
import { momentId } from "@/utils/momentIndonesia";
import DetailAnnouncement from "./DetailAnnouncement";
const ListAnnouncement = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const { setAnnouncementsAll, dtAnnouncements } = useAnnouncementsApi();
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState<AnnouncementsTypes | null>(null);
  // get announcement
  const getAnnouncement = useCallback(async () => {
    setIsLoading(true);
    await setAnnouncementsAll({});
    setIsLoading(false);
  }, [setAnnouncementsAll]);

  useEffect(() => {
    getAnnouncement();

    return () => {};
  }, [getAnnouncement]);

  const openDetail = (row: AnnouncementsTypes) => {
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
      <DetailAnnouncement
        setShowModal={setShowModal}
        showModal={showModal}
        announcement={row ?? null}
      />
      {!isLoading && (
        <div className="grid grid-cols-1 gap-y-10 justify-center">
          {dtAnnouncements.data.map((item: AnnouncementsTypes) => {
            // fungsi untuk membatasi jumlah karakter
            const limitContentLength = (content: string, maxLength: number) => {
              if (content.length > maxLength) {
                return content.slice(0, maxLength) + "..."; // tambahkan "..." jika konten terlalu panjang
              }
              return content;
            };
            const limitedContent = limitContentLength(item.content, 200);
            const cleanContent = DOMPurify.sanitize(limitedContent);

            return (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className="relative py-10 px-4 gap-y-2 flex w-full flex-col cursor-pointer rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
              >
                {/* judul */}
                <h1 className="text-xl font-bold">{item.title}</h1>
                <h4>
                  {item?.author ? `${item?.author} - ` : ""}{" "}
                  {momentId(item.announcement_date).format("DD MMMM YYYY")}{" "}
                  {" - "} {item.major.major_nm}
                </h4>
                <div
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                  className="relative prose h-full  overflow-hidden"
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ListAnnouncement;
