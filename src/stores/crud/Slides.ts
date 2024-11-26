/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import SlidesTypes from "@/types/SlidesTypes";

// crud slides

type Props = {
  id?: number | string;
  page?: number;
  limit?: number;
  search?: number | string;
  sortby?: string;
  order?: string;
};

type Store = {
  dtSlides: {
    last_page: number;
    current_page: number;
    data: SlidesTypes[];
  };
  showSlides: SlidesTypes;
  setSlides: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: never;
    error?: never;
  }>;
  setShowSlides: ({ id }: Props) => Promise<{
    status: string;
    data?: SlidesTypes[];
    error?: never;
  }>;
  addData: (
    data: SlidesTypes
  ) => Promise<{ status: string; data?: SlidesTypes[]; error?: never }>;
  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: SlidesTypes; error?: never }>;
  updateData: (
    id: number | string,
    data: SlidesTypes
  ) => Promise<{ status: string; data?: SlidesTypes; error?: never }>;
  setFormData: (row: SlidesTypes) => FormData;
};

const useSlides = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: SlidesTypes) => {
      const formData = new FormData();
      formData.append("title", row.title as string);
      formData.append("img_slide", row.img_slide as string);
      formData.append("position", row.position.toString());
      formData.append("description", row.description as string);
      return formData;
    },
    dtSlides: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    showSlides: {
      id: 0,
      title: "",
      img_slide: "",
      position: 0,
      description: "",
    },
    setSlides: async ({ page = 1, limit = 10, search }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/slides`,
          headers: { Authorization: `Bearer ${token}` },
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
          error: error.response?.data,
        };
      }
    },
    setShowSlides: async ({ id }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/slides/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          params: {},
        });
        set((state) => ({ ...state, showSlides: response.data.data }));
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
      const formData = row?.img_slide ? get().setFormData(row) : row;
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/slides`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        set((prevState) => ({
          dtSlides: {
            last_page: prevState.dtSlides.last_page,
            current_page: prevState.dtSlides.current_page,
            data: [res.data.data, ...prevState.dtSlides.data],
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
          url: `/slides/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtSlides: {
            last_page: prevState.dtSlides.last_page,
            current_page: prevState.dtSlides.current_page,
            data: prevState.dtSlides.data.filter((item: any) => item.id !== id),
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
      const formData = row?.img_slide ? get().setFormData(row) : row;
      const token = await useLogin.getState().setToken();
      const headersImg = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await crud({
          url: `/slides/${id}`,
          method: "post",
          headers: row?.img_slide
            ? headersImg
            : {
                Authorization: `Bearer ${token}`,
              },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((prevState) => ({
          dtSlides: {
            last_page: prevState.dtSlides.last_page,
            current_page: prevState.dtSlides.current_page,
            data: prevState.dtSlides.data.map((item: any) => {
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

export default useSlides;
