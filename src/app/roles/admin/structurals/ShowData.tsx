/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useStructurals from "@/stores/crud/Structurals";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import StructuralsTypes from "@/types/StructuralsTypes";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// structurals
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: StructuralsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setStructurals, dtStructurals } = useStructurals();
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
  const debouncedFetchStructurals = _.debounce((fetchStructurals) => {
    fetchStructurals();
  }, 500); // 500ms delay

  const fetchStructurals = useCallback(async () => {
    setLimit(10);
    await setStructurals({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setStructurals, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchStructurals(fetchStructurals);

    // Cleanup debounce
    return () => {
      debouncedFetchStructurals.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Nama", "Jabatan", "Aksi"];
  const tableBodies = ["employee.nm_employee", "position"];

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
              dataTable={dtStructurals?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtStructurals?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtStructurals?.current_page}
                totalPages={dtStructurals?.last_page}
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
