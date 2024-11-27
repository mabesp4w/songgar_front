/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import AcademicCalendarsTypes from "@/types/AcademicCalendarsTypes";
// api academicCalendars
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
};
// token from env
const token = process.env.NEXT_PUBLIC_TOKEN_SIAKAD;

type Store = {
  dtAcademicCalendars: {
    last_page: number;
    current_page: number;
    data: AcademicCalendarsTypes[];
  };
  setAcademicCalendars: ({
    page,
    limit,
    sortby,
    order,
    search,
  }: Props) => Promise<{
    status: string;
    data?: AcademicCalendarsTypes[];
    error?: unknown;
  }>;
  setAcademicCalendarsAll: ({ sortby, order, search }: Props) => Promise<{
    status: string;
    data?: AcademicCalendarsTypes[];
    error?: unknown;
  }>;
};

const useAcademicCalendarsApi = create(
  devtools<Store>((set) => ({
    dtAcademicCalendars: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setAcademicCalendars: async ({
      page = 1,
      limit = 10,
      sortby,
      order,
      search,
    }) => {
      try {
        const response = await api({
          method: "get",
          url: `/academicCalendars`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
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
          error: error?.response?.data,
        };
      }
    },
    setAcademicCalendarsAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/academicCalendars/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtAcademicCalendars: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useAcademicCalendarsApi;
