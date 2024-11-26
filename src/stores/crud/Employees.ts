/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import EmployeesTypes from "@/types/EmployeesTypes";
// store employees
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
  jabatan?: string;
};

type Store = {
  dtEmployees: {
    last_page: number;
    current_page: number;
    data: EmployeesTypes[];
  };

  setEmployees: ({
    page,
    limit,
    search,
    sortby,
    order,
    jabatan,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setShowEmployees: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  addData: (
    data: EmployeesTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;

  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: any; error?: any }>;

  updateData: (
    id: number | string,
    data: EmployeesTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useEmployees = create(
  devtools<Store>((set) => ({
    dtEmployees: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setEmployees: async ({
      page = 1,
      limit = 10,
      search,
      sortby,
      order,
      jabatan,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/employees`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
            jabatan,
          },
        });
        set((state) => ({ ...state, dtEmployees: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    setShowEmployees: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/employees/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, dtEmployees: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    addData: async (row) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/employees`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: row,
        });
        set((prevState) => ({
          dtEmployees: {
            last_page: prevState.dtEmployees.last_page,
            current_page: prevState.dtEmployees.current_page,
            data: [res.data.data, ...prevState.dtEmployees.data],
          },
        }));
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/employees/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtEmployees: {
            last_page: prevState.dtEmployees.last_page,
            current_page: prevState.dtEmployees.current_page,
            data: prevState.dtEmployees.data.filter(
              (item: any) => item.id !== id
            ),
          },
        }));
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const token = await useLogin.getState().setToken();

        const response = await crud({
          method: "POST",
          url: `/employees/${id}?_method=PUT`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: row,
        });
        set((prevState) => ({
          dtEmployees: {
            last_page: prevState.dtEmployees.last_page,
            current_page: prevState.dtEmployees.current_page,
            data: prevState.dtEmployees.data.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...response.data.data,
                };
              } else {
                return item;
              }
            }),
          },
        }));
        return {
          status: "berhasil update",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useEmployees;
