/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";
// api announcements
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
  dtAnnouncements: {
    last_page: number;
    current_page: number;
    data: AnnouncementsTypes[];
  };
  setAnnouncements: ({ page, limit, sortby, order, search }: Props) => Promise<{
    status: string;
    data?: AnnouncementsTypes[];
    error?: unknown;
  }>;
  setAnnouncementsAll: ({ sortby, order, search }: Props) => Promise<{
    status: string;
    data?: AnnouncementsTypes[];
    error?: unknown;
  }>;
};

const useAnnouncementsApi = create(
  devtools<Store>((set) => ({
    dtAnnouncements: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setAnnouncements: async ({
      page = 1,
      limit = 10,
      sortby,
      order,
      search,
    }) => {
      try {
        const response = await api({
          method: "get",
          url: `/announcements`,
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
        set((state) => ({ ...state, dtAnnouncements: response.data.data }));
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
    setAnnouncementsAll: async ({ sortby, order, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/announcements/all`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtAnnouncements: response.data.data }));
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

export default useAnnouncementsApi;
