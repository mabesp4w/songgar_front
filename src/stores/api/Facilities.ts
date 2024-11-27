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
import { api } from "@/services/baseURL";
import useLogin from "../auth/login";
// api facilities
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  jabatan?: string;
};

type Store = {
  dtFacilities: any;
  setFacilities: ({ page, limit, search, jabatan }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setFacilitiesAll: ({ search, jabatan }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const token = async () => {
  return await useLogin.getState().setToken();
};

const useFacilitiesApi = create(
  devtools<Store>((set) => ({
    dtFacilities: [],
    setFacilities: async ({ page = 1, limit = 10, search, jabatan }) => {
      try {
        const response = await api({
          method: "get",
          url: `/facilities`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            limit,
            page,
            search,
            jabatan,
          },
        });
        set((state) => ({ ...state, dtFacilities: response.data }));
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
    setFacilitiesAll: async ({ search, jabatan }) => {
      try {
        const response = await api({
          method: "get",
          url: `/facilities/all`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            search,
            jabatan,
          },
        });
        set((state) => ({ ...state, dtFacilities: response.data.data }));
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

export default useFacilitiesApi;