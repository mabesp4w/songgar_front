/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useVideos from "@/stores/crud/galleries/Videos";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import VideosTypes from "@/types/galleries/VideosTypes";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// videos
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: VideosTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setVideos, dtVideos } = useVideos();
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
  const debouncedFetchVideos = _.debounce((fetchVideos) => {
    fetchVideos();
  }, 500); // 500ms delay

  const fetchVideos = useCallback(async () => {
    setLimit(10);
    await setVideos({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setVideos, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchVideos(fetchVideos);

    // Cleanup debounce
    return () => {
      debouncedFetchVideos.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Judul", "Ket", "Video", "Aksi"];
  const tableBodies = ["title_video", "description", "youtube_url"];

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtVideos?.data,
        picture: "img_videos",
        title: { path: "title" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtVideos?.data]);

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
              dataTable={dtVideos?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
              sorter="created_at"
              order="desc"
              setIndexBox={setIndexBox}
            />
          </div>
          {dtVideos?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtVideos?.current_page}
                totalPages={dtVideos?.last_page}
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
