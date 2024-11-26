/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import NewsTypes from "@/types/NewsTypes";
// api news
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
  dtNews: {
    last_page: number;
    current_page: number;
    data: NewsTypes[];
  };
  setNews: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: NewsTypes[];
    error?: unknown;
  }>;
  setNewsAll: ({ search }: Props) => Promise<{
    status: string;
    data?: NewsTypes[];
    error?: unknown;
  }>;
};

const useNewsApi = create(
  devtools<Store>((set) => ({
    dtNews: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setNews: async ({ page = 1, limit = 10, sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/news`,
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
        set((state) => ({ ...state, dtNews: response.data.data }));
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
    setNewsAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/news/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtNews: response.data.data }));
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

export default useNewsApi;
