/** @format */
"use client";
import { Suspense, useEffect, useState } from "react";

import ShowData from "./ShowData";
import Form from "./form/Form";
import ModalDelete from "@/components/modal/ModalDelete";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import BtnDefault from "@/components/button/BtnDefault";
import { useWelcomeContext } from "@/context/WelcomeContext";
import Searching from "./Searching";
import PhotosTypes from "@/types/galleries/PhotosTypes";
import { useForm } from "react-hook-form";
import usePhotos from "@/stores/crud/galleries/Photos";

// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};
// photos
const Photos = () => {
  // context
  const halaman = "Foto";
  const { setWelcome } = useWelcomeContext();

  useEffect(() => {
    setWelcome(`Halaman ${halaman}`);
    return () => {};
  }, [setWelcome]);
  // store
  const { removeData } = usePhotos();
  // state
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | string>();
  const [dtEdit, setDtEdit] = useState<PhotosTypes | null>();

  const handleTambah = () => {
    setShowModal(true);
    setDtEdit(null);
  };

  const setEdit = (row: PhotosTypes) => {
    setShowModal(true);
    setDtEdit(row);
  };

  const setDelete = async ({ id, isDelete }: Delete) => {
    setIdDel(id);
    if (isDelete) {
      const { data } = await removeData(idDel as number);
      toastShow({
        event: data,
      });
      setShowDelete(false);
    } else setShowDelete(true);
  };

  // hook form
  const { register, setValue, watch, control } = useForm();

  return (
    <div className="flex flex-col h-full w-full">
      <div>
        <Toaster />
        <Form
          dtEdit={dtEdit ?? null}
          showModal={showModal}
          setShowModal={setShowModal}
          halaman={halaman}
        />
        <ModalDelete
          showDel={showDelete}
          setShowDel={setShowDelete}
          setDelete={setDelete}
        />
        <div className="mb-4 flex justify-between">
          <p>Silahkan Mengolah data {halaman}</p>
          <BtnDefault onClick={handleTambah}>Tambah Data</BtnDefault>
        </div>
      </div>

      <div className="mb-4">
        <Searching
          halaman={halaman}
          register={register}
          setValue={setValue}
          watch={watch}
          control={control}
        />
      </div>

      <Suspense>
        <ShowData setDelete={setDelete} setEdit={setEdit} />
      </Suspense>
    </div>
  );
};

export default Photos;
