/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useAnnouncements from "@/stores/crud/Announcements";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// announcements
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: AnnouncementsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setAnnouncements, dtAnnouncements } = useAnnouncements();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams?.get("sortby") || "";
  const order = searchParams?.get("order") || "";
  const search = searchParams?.get("cari") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchAnnouncements = _.debounce((fetchAnnouncements) => {
    fetchAnnouncements();
  }, 500); // 500ms delay

  const fetchAnnouncements = useCallback(async () => {
    setLimit(10);
    await setAnnouncements({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setAnnouncements, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchAnnouncements(fetchAnnouncements);

    // Cleanup debounce
    return () => {
      debouncedFetchAnnouncements.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = [
    "No",
    "Prodi",
    "Judul",
    "Penulis",
    "Tgl. Pengumuman",
    "Isi",
    "Aksi",
  ];
  const tableBodies = [
    "major.major_nm",
    "title",
    "author",
    "announcement_date",
    "content",
  ];

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtAnnouncements?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
              sorter="announcement_date"
              order="desc"
            />
          </div>
          {dtAnnouncements?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtAnnouncements?.current_page}
                totalPages={dtAnnouncements?.last_page}
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
