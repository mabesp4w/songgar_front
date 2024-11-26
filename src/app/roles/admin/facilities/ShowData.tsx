/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import FacilitiesTypes from "@/types/FacilitiesTypes";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";
import useFacilities from "@/stores/crud/Facilities";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// facilities
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: FacilitiesTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setFacilities, dtFacilities } = useFacilities();
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
  const debouncedFetchFacilities = _.debounce((fetchFacilities) => {
    fetchFacilities();
  }, 500); // 500ms delay

  const fetchFacilities = useCallback(async () => {
    setLimit(10);
    await setFacilities({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setFacilities, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchFacilities(fetchFacilities);

    // Cleanup debounce
    return () => {
      debouncedFetchFacilities.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = [
    "No",
    "Nama",
    "Tipe",
    "Lokasi",
    "Kondisi",
    "Jumlah",
    "Deskripsi",
    "Gambar",
    "Aksi",
  ];
  const tableBodies = [
    "nm_facility",
    "type",
    "location",
    "condition",
    "quantity",
    "description",
    "img_facility",
  ];

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtFacilities?.data,
        picture: "img_facility",
        title: { path: "nm_facility" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtFacilities?.data]);

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
              dataTable={dtFacilities?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
              sorter="nm_facility"
              setIndexBox={setIndexBox}
            />
          </div>
          {dtFacilities?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtFacilities?.current_page}
                totalPages={dtFacilities?.last_page}
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
