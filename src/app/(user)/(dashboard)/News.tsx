/** @format */

import { BASE_URL } from "@/services/baseURL";
import useNewsApi from "@/stores/api/News";
import { momentId } from "@/utils/momentIndonesia";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BsNewspaper } from "react-icons/bs";

const News: FC = () => {
  // news
  const { setNews, dtNews } = useNewsApi();
  // state
  const [shortContent, setShortContent] = useState("");
  useEffect(() => {
    setNews({});
  }, [setNews]);

  useEffect(() => {
    if (dtNews?.data[0]?.content) {
      const contentText = dtNews.data[0].content.replace(/<\/?[^>]+(>|$)/g, ""); // Hapus HTML tags
      const truncatedText =
        contentText.length > 100
          ? contentText.substring(0, 100) + "..."
          : contentText;
      setShortContent(truncatedText);
    }
  }, [dtNews]);

  return dtNews ? (
    dtNews?.data.length > 0 && (
      <div>
        <div className="bg-primary rounded-t-xl text-accent py-3">
          <div className="flex items-center gap-x-4 text-lg">
            <BsNewspaper />
            <span className="tracking-wide">Berita</span>
          </div>
        </div>
        <div className="relative min-h-60 rounded-none mx-0">
          <Image
            src={`${BASE_URL}/${dtNews?.data[0]?.img_news}`}
            alt={dtNews?.data[0]?.title}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <p>{momentId(dtNews?.data[0]?.news_date).format("DD/MM/YYYY")}</p>
          <p className="font-bold text-lg" title={dtNews?.data[0]?.title}>
            {dtNews?.data[0]?.title?.length > 40
              ? dtNews.data[0].title.substring(0, 40) + "..."
              : dtNews.data[0].title}
          </p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: shortContent,
            }}
          />
        </div>
        <div className="-mt-4 flex justify-end">
          <Link
            href="#"
            className="text-primary md:text-primary/60 p-2 underline hover:text-primary"
          >
            Lainnya
          </Link>
        </div>
      </div>
    )
  ) : (
    <div>Loading..</div>
  );
};

export default News;
