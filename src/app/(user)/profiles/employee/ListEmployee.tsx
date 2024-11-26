/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { BASE_URL } from "@/services/baseURL";
import useEmployeesApi from "@/stores/api/Employee";
import EmployeesTypes from "@/types/EmployeesTypes";
import { momentId } from "@/utils/momentIndonesia";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
const ListEmployee = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const { setEmployeesAll, dtEmployees } = useEmployeesApi();
  // get Employee
  const getEmployee = useCallback(async () => {
    setIsLoading(true);
    await setEmployeesAll({});
    setIsLoading(false);
  }, [setEmployeesAll]);

  useEffect(() => {
    getEmployee();

    return () => {};
  }, [getEmployee]);

  console.log({ dtEmployees });
  return (
    <section className=" my-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-2">
          {dtEmployees.map((item: EmployeesTypes) => {
            const umur = momentId().diff(item.birthdate, "years");
            return (
              <div
                key={item.id}
                className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                  <Image
                    src={`${BASE_URL}/${item.img_employee}`}
                    alt="image"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal antialiased">
                    {item.nm_employee}
                  </h6>
                  <p className="capitalize">
                    {item.jabatan}{" "}
                    {item.major?.major_nm ? `- ${item.major?.major_nm}` : ""}
                  </p>
                  {item.structurals && item.structurals.length > 0 && (
                    <p className="capitalize">
                      {item.structurals.map((item) => item.position).join(", ")}
                    </p>
                  )}
                  <p>Bergabung Sejak {momentId(item.hire_date).format("LL")}</p>
                  <p>Umur: {umur} tahun</p>
                  <p>{item.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ListEmployee;
