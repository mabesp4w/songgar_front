/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useSlides from "@/stores/crud/Slides";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import LightPlugins from "@/components/lightBox/LightPlugins";
import SlidesTypes from "@/types/SlidesTypes";
import _ from "lodash";
import lightImgDB from "@/components/lightBox/lightImgDB";
// slides
type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: SlidesTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  // store
  const { setSlides, dtSlides } = useSlides();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [showSlides, setShowSlides] = useState<never>();
  // search params
  const searchParams = useSearchParams();
  const search = useSearchParams().get("cari") || "";
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchDataSlides = _.debounce((fetchDataSlides) => {
    fetchDataSlides();
  }, 500); // 500ms delay

  const fetchDataSlides = useCallback(async () => {
    setLimit(10);
    await setSlides({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setSlides, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchDataSlides(fetchDataSlides);

    // Cleanup debounce
    return () => {
      debouncedFetchDataSlides.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Posisi", "Judul", "Ket", "Gambar", "Aksi"];
  const tableBodies = ["position", "title", "description", "img_slide"];

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtSlides?.data,
        picture: "img_slide",
        title: { path: "title" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtSlides?.data]);

  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {/* lightBox */}
      <LightPlugins
        index={indexBox}
        setIndex={setIndexBox}
        slides={showSlides}
      />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <div className="overflow-auto">
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtSlides?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="position"
            setIndexBox={setIndexBox}
          />
          {dtSlides?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtSlides?.current_page}
                totalPages={dtSlides?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowData;
