/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import usePhotos from "@/stores/crud/galleries/Photos";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import PhotosTypes from "@/types/galleries/PhotosTypes";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// photos
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: PhotosTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setPhotos, dtPhotos } = usePhotos();
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
  const debouncedFetchPhotos = _.debounce((fetchPhotos) => {
    fetchPhotos();
  }, 500); // 500ms delay

  const fetchPhotos = useCallback(async () => {
    setLimit(10);
    await setPhotos({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setPhotos, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchPhotos(fetchPhotos);

    // Cleanup debounce
    return () => {
      debouncedFetchPhotos.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Judul", "Foto", "Aksi"];
  const tableBodies = ["title_photo", "description", "photo_path"];

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
              dataTable={dtPhotos?.data}
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
          {dtPhotos?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtPhotos?.current_page}
                totalPages={dtPhotos?.last_page}
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
