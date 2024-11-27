/** @format */

import ModalFull from "@/components/modal/ModalFull";
import { BASE_URL } from "@/services/baseURL";
import NewsTypes from "@/types/NewsTypes";
import { momentId } from "@/utils/momentIndonesia";
import DOMPurify from "dompurify";
import Image from "next/image";
import React from "react";

type Props = {
  news: NewsTypes | null;
  showModal: boolean;
  setShowModal: (data: boolean) => void;
};

const DetailNews = ({ news, showModal, setShowModal }: Props) => {
  const cleanContent = DOMPurify.sanitize(news?.content || "");

  if (!news) {
    return null;
  }

  return (
    <ModalFull
      title={`${news?.title}`}
      showModal={showModal}
      setShowModal={setShowModal}
      width="90%"
    >
      <div className="flex flex-col gap-y-6">
        <div className="w-96 self-center cursor-pointer overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <Image
            className="h-full w-full object-cover"
            width={100}
            height={100}
            src={`${BASE_URL}/${news.img_news}`}
            alt="profile-picture"
          />
        </div>
        {/* judul */}
        <div>
          <h6 className="text-sm">{news?.author ? `- ${news?.author}` : ""}</h6>
          <h5>Jayapura, {momentId(news?.news_date).format("LL")}</h5>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: cleanContent }}
          className="relative prose h-full  overflow-hidden"
        />
      </div>
    </ModalFull>
  );
};

export default DetailNews;
