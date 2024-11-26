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
// api employees
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
};

type Store = {
  dtEmployees: any;
  setEmployees: ({ page, limit, search, role }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setEmployeesAll: ({ search, role }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const token = async () => {
  return await useLogin.getState().setToken();
};

const useEmployeesApi = create(
  devtools<Store>((set) => ({
    dtEmployees: [],
    setEmployees: async ({ page = 1, limit = 10, search, role }) => {
      try {
        const response = await api({
          method: "get",
          url: `/employees`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            limit,
            page,
            search,
            role,
          },
        });
        set((state) => ({ ...state, dtEmployees: response.data }));
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
    setEmployeesAll: async ({ search, role }) => {
      try {
        const response = await api({
          method: "get",
          url: `/employees/all`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            search,
            role,
          },
        });
        set((state) => ({ ...state, dtEmployees: response.data }));
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

export default useEmployeesApi;
