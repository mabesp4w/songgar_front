/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useAcademicCalendars from "@/stores/crud/AcademicCalendars";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
// academicCalendars
type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  // store
  const { setAcademicCalendars, dtAcademicCalendars } = useAcademicCalendars();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const search = useSearchParams().get("cari") || "";
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";
  const year = searchParams.get("year") || "";
  const month = searchParams.get("month") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchAcademicCalendars = _.debounce(
    (fetchAcademicCalendars) => {
      fetchAcademicCalendars();
    },
    500
  ); // 500ms delay

  const fetchAcademicCalendars = useCallback(async () => {
    setLimit(10);
    await setAcademicCalendars({
      page,
      limit,
      search,
      sortby,
      order,
      year,
      month,
    });
    setIsLoading(false);
  }, [setAcademicCalendars, page, limit, search, sortby, order, year, month]);

  useEffect(() => {
    if (year) {
      debouncedFetchAcademicCalendars(fetchAcademicCalendars);
    }

    // Cleanup debounce
    return () => {
      debouncedFetchAcademicCalendars.cancel();
    };
  }, [search, sortby, order, page, limit, year, month]);

  // table
  const headTable = [
    "No",
    "Nama Event",
    "Tanggal Mulai",
    "Tanggal Selesai",
    "Ket",
    "Aksi",
  ];
  const tableBodies = ["nm_event", "start_date", "end_date", "description"];

  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <div className="overflow-auto">
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtAcademicCalendars?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
          />
          {dtAcademicCalendars?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtAcademicCalendars?.current_page}
                totalPages={dtAcademicCalendars?.last_page}
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
