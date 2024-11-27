/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import VideosTypes from "@/types/galleries/VideosTypes";
// api videos
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
  dtVideos: {
    last_page: number;
    current_page: number;
    data: VideosTypes[];
  };
  setVideos: ({ page, limit, sortby, order, search }: Props) => Promise<{
    status: string;
    data?: VideosTypes[];
    error?: unknown;
  }>;
  setVideosAll: ({ sortby, order, search }: Props) => Promise<{
    status: string;
    data?: VideosTypes[];
    error?: unknown;
  }>;
};

const useVideosApi = create(
  devtools<Store>((set) => ({
    dtVideos: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setVideos: async ({ page = 1, limit = 10, sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/videos`,
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
        set((state) => ({ ...state, dtVideos: response.data.data }));
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
    setVideosAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/videos/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtVideos: response.data }));
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

export default useVideosApi;
