/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import MajorsTypes from "@/types/MajorsTypes";
// api majors
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
  dtMajors: {
    last_page: number;
    current_page: number;
    data: MajorsTypes[];
  };
  setMajors: ({ page, limit, sortby, order, search }: Props) => Promise<{
    status: string;
    data?: MajorsTypes[];
    error?: unknown;
  }>;
  setMajorsAll: ({ sortby, order, search }: Props) => Promise<{
    status: string;
    data?: MajorsTypes[];
    error?: unknown;
  }>;
};

const useMajorsApi = create(
  devtools<Store>((set) => ({
    dtMajors: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setMajors: async ({ page = 1, limit = 10, sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/majors`,
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
        set((state) => ({ ...state, dtMajors: response.data.data }));
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
    setMajorsAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/majors/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtMajors: response.data.data }));
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

export default useMajorsApi;
