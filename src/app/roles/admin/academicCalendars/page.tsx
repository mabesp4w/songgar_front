/** @format */

"use client";
import { Suspense, useEffect, useState } from "react";

import Form from "./form/Form";
import ModalDelete from "@/components/modal/ModalDelete";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import BtnDefault from "@/components/button/BtnDefault";
import { useForm } from "react-hook-form";
import { useWelcomeContext } from "@/context/WelcomeContext";
import ShowData from "./ShowData";
import useAcademicCalendars from "@/stores/crud/AcademicCalendars";
import Searching from "./Searching";

// academicCalendars
// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

const AcademicCalendars = () => {
  // context
  const halaman = "Kalender Akademik";
  const { setWelcome } = useWelcomeContext();

  useEffect(() => {
    setWelcome(`Halaman ${halaman}`);

    return () => {};
  }, [setWelcome]);
  // store
  const { removeData } = useAcademicCalendars();
  // state
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dtEdit, setDtEdit] = useState<any>();

  const handleTambah = () => {
    setShowModal(true);
    setDtEdit(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setEdit = (row: any) => {
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
    <div className="flex flex-col h-full w-full gap-y-2 overflow-hidden ">
      <div className="flex flex-col shrink">
        <Toaster />
        <Form
          dtEdit={dtEdit}
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
          <div>
            <BtnDefault onClick={handleTambah}>Tambah Data</BtnDefault>
          </div>
        </div>
        <Searching
          halaman={halaman}
          register={register as never}
          setValue={setValue}
          watch={watch as never}
          control={control as never}
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ShowData setDelete={setDelete} setEdit={setEdit} />
      </Suspense>
    </div>
  );
};

export default AcademicCalendars;
