/**
 * eslint-disable @typescript-eslint/no-unused-expressions
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import getProperty from "@/services/getProperty";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BsArrowDownShort,
  BsArrowUpShort,
  BsFillPencilFill,
  BsFillTrashFill,
} from "react-icons/bs";

type Props = {
  headTable: string[];
  dataTable: any[];
  tableBodies: string[];
  setEdit?: (data: any) => void | undefined;
  setDelete?: ({
    id,
    isDelete,
  }: {
    id?: number | string;
    isDelete: boolean;
  }) => void;
  limit: number;
  page: number;
  ubah: boolean;
  hapus: boolean;
  pekerjaan?: boolean;
  costume?: any;
  sorter?: string;
  order?: "asc" | "desc";
  setIndexBox?: (data: number) => void;
};

const TablesDefault = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clickCount, setClickCount] = useState<number>(0);
  const [bodyTable, setBodyTable] = useState<string>();
  const [order, setOrder] = useState<string>();
  // membuat no urut
  const showNo = (index: number) => {
    const noUrut = (props.page - 1) * props.limit + index;
    return noUrut + 1;
  };
  // mengambil parame
  const sortby = searchParams.get("sortby");
  // mengambil urutan
  const sortBy = (name: string, order?: string) => {
    // simpan body table
    setBodyTable(name);
    // get full url
    const fullUrl = window.location.href;
    // cek params
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    // Jika nama yang diklik sama dengan nama sebelumnya, tambahkan 1 pada hitungan sebelumnya, jika tidak, mulai dari 1
    const newCount = name === sortby ? clickCount + 1 : 1;
    // Tentukan apakah urutan harus naik atau turun berdasarkan apakah hitungan ganjil atau genap
    const sortOrder = newCount % 2 === 0 ? "desc" : "asc";
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("sortby");
    params.delete("order");
    // Tambahkan parameter sort baru
    params.append("sortby", name);
    params.append("order", order || sortOrder);
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
    // Simpan jumlah klik yang baru
    setClickCount(newCount);
    // simpan order
    setOrder(sortOrder);
  };

  useEffect(() => {
    // Jika sortby tidak ada, reset urutan ke default
    if (props.sorter) {
      sortBy(props.sorter, props.order);
    }
  }, [props.sorter]);

  return (
    <table className="w-full border-collapse text-left bg-white/50 text-black">
      <thead className="">
        <tr>
          {props.headTable &&
            props.headTable.map((row, index) => {
              const body = props.tableBodies[index - 1];
              return (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-4 ${
                    !(row === "Aksi" || row === "No") && "cursor-pointer"
                  }`}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    !(row === "Aksi" || row === "No") && sortBy(body);
                  }}
                >
                  <div className="flex items-center gap-1">
                    {row}
                    {bodyTable === body && (
                      <span className="flex">
                        <BsArrowUpShort
                          className={`${order === "desc" && "hidden"}`}
                        />
                        <BsArrowDownShort
                          className={`${order === "asc" && "hidden"}`}
                        />
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
        {/* loop tr */}
        {props.dataTable &&
          props.dataTable.map((row: any, index) => {
            const { id } = row;
            const dtIndex = index;
            return (
              <tr key={index}>
                <td className="px-6 py-4 rounded-l-xl">{showNo(index)}</td>
                {/* loop td */}
                {props.tableBodies.map((column, index) => {
                  return (
                    <td key={index} className={`px-6 py-4`}>
                      {getProperty(row, column, dtIndex, props.setIndexBox)}
                    </td>
                  );
                })}
                {/* aksi */}
                <td className="px-6 py-4 rounded-r-xl">
                  <div className="flex flex-row gap-2">
                    {/*  */}
                    {props.costume && props.costume(row)}
                    {props.ubah && (
                      <BsFillPencilFill
                        onClick={() => props.setEdit && props?.setEdit(row)}
                        size={20}
                        className="cursor-pointer hover:text-yellow-500"
                        title="Ubah"
                      />
                    )}
                    {props.hapus && (
                      <BsFillTrashFill
                        onClick={() =>
                          props?.setDelete &&
                          props?.setDelete({ id, isDelete: false })
                        }
                        size={20}
                        className="cursor-pointer hover:text-red-700"
                        title="Hapus"
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TablesDefault;
