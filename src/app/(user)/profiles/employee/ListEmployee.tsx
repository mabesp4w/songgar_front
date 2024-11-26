/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { BASE_URL } from "@/services/baseURL";
import useEmployeesApi from "@/stores/api/Employee";
import EmployeesTypes from "@/types/EmployeesTypes";
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
    <section>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-y-4 gap-x-4">
          {dtEmployees.map((item: EmployeesTypes) => (
            <div
              key={item.id}
              className="relative flex w-52 lg:w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <Image
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                  src={`${BASE_URL}/${item.img_employee}`}
                  alt="profile-picture"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.nm_employee}
                </h4>
                <p className="capitalize text-primary">{item.jabatan}</p>
                <p className="capitalize">{item.major?.major_nm}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListEmployee;
