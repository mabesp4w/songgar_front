/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import PhotosTypes from "@/types/galleries/PhotosTypes";
// api photos
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
  dtPhotos: {
    last_page: number;
    current_page: number;
    data: PhotosTypes[];
  };
  setPhotos: ({ page, limit, sortby, order, search }: Props) => Promise<{
    status: string;
    data?: PhotosTypes[];
    error?: unknown;
  }>;
  setPhotosAll: ({ sortby, order, search }: Props) => Promise<{
    status: string;
    data?: PhotosTypes[];
    error?: unknown;
  }>;
};

const usePhotosApi = create(
  devtools<Store>((set) => ({
    dtPhotos: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setPhotos: async ({ page = 1, limit = 10, sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/photos`,
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
        set((state) => ({ ...state, dtPhotos: response.data.data }));
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
    setPhotosAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/photos/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtPhotos: response.data }));
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

export default usePhotosApi;
