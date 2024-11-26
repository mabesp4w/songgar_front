/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import SlidesTypes from "@/types/SlidesTypes";
// api slides
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};
// token from env
const token = process.env.NEXT_PUBLIC_TOKEN_SIAKAD;

type Store = {
  dtSlides: SlidesTypes[];
  setSlides: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: SlidesTypes[];
    error?: unknown;
  }>;
  setSlidesAll: ({ search }: Props) => Promise<{
    status: string;
    data?: SlidesTypes[];
    error?: unknown;
  }>;
};

const useSlidesApi = create(
  devtools<Store>((set) => ({
    dtSlides: [],
    setSlides: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/slides`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtSlides: response.data.data }));
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
    setSlidesAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/slides/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtSlides: response.data.data }));
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

export default useSlidesApi;
