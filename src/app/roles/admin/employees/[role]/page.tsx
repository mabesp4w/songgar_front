/** @format */
"use client";
import { Suspense, useEffect, useState } from "react";

import Form from "./form/Form";
import ModalDelete from "@/components/modal/ModalDelete";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import BtnDefault from "@/components/button/BtnDefault";
import { useWelcomeContext } from "@/context/WelcomeContext";
import ShowData from "./ShowData";
import EmployeesTypes from "@/types/EmployeesTypes";
import useEmployees from "@/stores/crud/Employees";

// employees
// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

const Employees = ({ params }: { params: { role: string } }) => {
  // params
  const { role } = params;
  // context
  const halaman = role;
  const { setWelcome } = useWelcomeContext();
  // state
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | string>();
  const [dtEdit, setDtEdit] = useState<EmployeesTypes | null>();
  const [compToaster, setCompToaster] = useState<boolean>(false);

  useEffect(() => {
    setWelcome(`Halaman ${halaman}`);
    setCompToaster(true);
    return () => {
      setCompToaster(false);
    };
  }, [halaman, setWelcome]);
  // store
  const { removeData } = useEmployees();

  const handleTambah = () => {
    setShowModal(true);
    setDtEdit(null);
  };

  const setEdit = (row: EmployeesTypes) => {
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

  return (
    <div className="flex flex-col h-full w-full gap-y-2 overflow-hidden ">
      <div className="flex flex-col shrink">
        {compToaster && <Toaster position="top-center" reverseOrder={false} />}
        <Form
          dtEdit={dtEdit ?? null}
          showModal={showModal}
          setShowModal={setShowModal}
          halaman={halaman}
          role={role}
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
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ShowData setDelete={setDelete} setEdit={setEdit} role={role} />
      </Suspense>
    </div>
  );
};

export default Employees;
