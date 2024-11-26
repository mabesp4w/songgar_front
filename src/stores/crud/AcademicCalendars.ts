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
import AcademicCalendarsTypes from "@/types/AcademicCalendarsTypes";
// store academicCalendars
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
  year?: string;
  month?: string;
};

type Store = {
  dtAcademicCalendars: {
    last_page: number;
    current_page: number;
    data: AcademicCalendarsTypes[];
  };

  setAcademicCalendars: ({
    page,
    limit,
    search,
    sortby,
    order,
    year,
    month,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setShowAcademicCalendars: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  addData: (
    data: AcademicCalendarsTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;

  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: any; error?: any }>;

  updateData: (
    id: number | string,
    data: AcademicCalendarsTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useAcademicCalendars = create(
  devtools<Store>((set) => ({
    dtAcademicCalendars: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setAcademicCalendars: async ({
      page = 1,
      limit = 10,
      search,
      sortby,
      order,
      year,
      month,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/academicCalendars`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
            year,
            month,
          },
        });
        set((state) => ({ ...state, dtAcademicCalendars: response.data.data }));
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
    setShowAcademicCalendars: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/academicCalendars/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, dtAcademicCalendars: response.data.data }));
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
          url: `/academicCalendars`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: row,
        });
        set((prevState) => ({
          dtAcademicCalendars: {
            last_page: prevState.dtAcademicCalendars.last_page,
            current_page: prevState.dtAcademicCalendars.current_page,
            data: [res.data.data, ...prevState.dtAcademicCalendars.data],
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
          url: `/academicCalendars/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtAcademicCalendars: {
            last_page: prevState.dtAcademicCalendars.last_page,
            current_page: prevState.dtAcademicCalendars.current_page,
            data: prevState.dtAcademicCalendars.data.filter(
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
          method: "PUT",
          url: `/academicCalendars/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          data: row,
        });
        set((prevState) => ({
          dtAcademicCalendars: {
            last_page: prevState.dtAcademicCalendars.last_page,
            current_page: prevState.dtAcademicCalendars.current_page,
            data: prevState.dtAcademicCalendars.data.map((item: any) => {
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

export default useAcademicCalendars;
