/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import BtnDefault from "@/components/button/BtnDefault";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useEmployees from "@/stores/crud/Employees";
import EmployeesTypes from "@/types/EmployeesTypes";
// employees;
type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: EmployeesTypes | null;
  halaman: string;
  role: string;
};

const Form = ({ showModal, setShowModal, dtEdit, halaman, role }: Props) => {
  // store
  const { addData, updateData } = useEmployees();
  // state
  const [isLoading, setIsLoading] = useState(false);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<EmployeesTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("NIP", "");
    setValue("nm_employee", "");
    setValue("address", "");
    setValue("gender", "");
    setValue("jabatan", role);
    setValue("phone", "");
    setValue("birthdate", "");
    setValue("hire_date", "");
    setValue("img_employee", "");
    setValue("status", "aktif");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("NIP", dtEdit.NIP || "");
      setValue("nm_employee", dtEdit.nm_employee);
      setValue("address", dtEdit.address);
      setValue("gender", dtEdit.gender);
      setValue("jabatan", dtEdit.jabatan);
      setValue("phone", dtEdit.phone);
      setValue("birthdate", dtEdit.birthdate);
      setValue("hire_date", dtEdit.hire_date);
      setValue("img_employee", dtEdit.img_employee);
      setValue("status", dtEdit.status);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<EmployeesTypes> = async (row) => {
    //  submit data
    submitData({
      row,
      dtEdit,
      setIsLoading,
      setShowModal,
      addData,
      updateData,
      resetForm,
      toastShow,
    });
  };

  return (
    <ModalDefault
      title={`Form ${halaman}`}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />
        <div className="grid grid-cols-8 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            dtEdit={dtEdit}
            control={control}
            watch={watch}
            setValue={setValue}
            showModal={showModal}
            role={role}
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <BtnDefault onClick={handleSubmit(onSubmit)} type="submit">
              Simpan
            </BtnDefault>
          )}
        </div>
      </form>
    </ModalDefault>
  );
};

export default Form;
