/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import LightPlugins from "@/components/lightBox/LightPlugins";
import EmployeesTypes from "@/types/EmployeesTypes";
import Costume from "./Costume";
import lightImgDB from "@/components/lightBox/lightImgDB";
import _ from "lodash";
import useEmployees from "@/stores/crud/Employees";
// employees
type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: EmployeesTypes) => void;
  role: string;
};

const ShowData: FC<Props> = ({ setDelete, setEdit, role }) => {
  // store
  const { setEmployees, dtEmployees } = useEmployees();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [slides, setSlides] = useState<unknown>();
  // search params
  const searchParams = useSearchParams();
  const search = useSearchParams().get("cari") || "";
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchEmployees = _.debounce((fetchEmployees) => {
    fetchEmployees();
  }, 500); // 500ms delay

  const fetchEmployees = useCallback(async () => {
    setLimit(10);
    await setEmployees({
      page,
      limit,
      search,
      sortby,
      order,
      jabatan: role,
    });
    setIsLoading(false);
  }, [setEmployees, page, limit, search, sortby, order, role]);

  useEffect(() => {
    debouncedFetchEmployees(fetchEmployees);

    // Cleanup debounce
    return () => {
      debouncedFetchEmployees.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = [
    "No",
    "Prodi",
    "NIDN",
    "Nama",
    "Jenkel",
    "Tgl. Lahir",
    "Foto",
    "Aksi",
  ];
  const tableBodies = [
    "major.major_nm",
    "NIP",
    "nm_employee",
    "gender",
    "birthdate",
    "img_employee",
  ];

  useEffect(() => {
    setSlides(
      lightImgDB({
        data: dtEmployees?.data,
        picture: "img_employee",
        title: { path: "NIP" },
        description: { path: "nm_employee" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtEmployees?.data]);
  // costume click
  const costume = (row: EmployeesTypes) => {
    return <Costume dtEmployees={row} />;
  };
  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {/* lightBox */}
      <LightPlugins index={indexBox} setIndex={setIndexBox} slides={slides} />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <div className="overflow-auto">
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtEmployees?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="NIP"
            setIndexBox={setIndexBox}
            costume={costume}
          />
          {dtEmployees?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtEmployees?.current_page}
                totalPages={dtEmployees?.last_page}
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
