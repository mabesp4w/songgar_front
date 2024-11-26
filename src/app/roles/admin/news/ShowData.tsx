/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useNews from "@/stores/crud/News";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import NewsTypes from "@/types/NewsTypes";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// news
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: NewsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setNews, dtNews } = useNews();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [showSlides, setShowSlides] = useState<never>();
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams?.get("sortby") || "";
  const order = searchParams?.get("order") || "";
  const search = searchParams?.get("cari") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchNews = _.debounce((fetchNews) => {
    fetchNews();
  }, 500); // 500ms delay

  const fetchNews = useCallback(async () => {
    setLimit(10);
    await setNews({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setNews, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchNews(fetchNews);

    // Cleanup debounce
    return () => {
      debouncedFetchNews.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = [
    "No",
    "Judul",
    "Penulis",
    "Tgl. Berita",
    "Gambar Utama",
    "Isi",
    "Aksi",
  ];
  const tableBodies = ["title", "author", "news_date", "img_news", "content"];

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtNews?.data,
        picture: "img_news",
        title: { path: "title" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtNews?.data]);

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {/* lightBox */}
      <LightPlugins
        index={indexBox}
        setIndex={setIndexBox}
        slides={showSlides}
      />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtNews?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
              sorter="news_date"
              order="desc"
              setIndexBox={setIndexBox}
            />
          </div>
          {dtNews?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtNews?.current_page}
                totalPages={dtNews?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowData;
