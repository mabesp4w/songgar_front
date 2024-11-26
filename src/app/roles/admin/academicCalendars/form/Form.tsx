/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useAcademicCalendars from "@/stores/crud/AcademicCalendars";
import AcademicCalendarsTypes from "@/types/AcademicCalendarsTypes";
// academicCalendars;
type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: any;
  halaman: string;
};

const Form = ({ showModal, setShowModal, dtEdit, halaman }: Props) => {
  // store
  const { addData, updateData } = useAcademicCalendars();
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
  } = useForm<AcademicCalendarsTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("nm_event", "");
    setValue("start_date", "");
    setValue("end_date", "");
    setValue("description", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("nm_event", dtEdit.nm_event);
      setValue("start_date", dtEdit.start_date);
      setValue("end_date", dtEdit.end_date);
      setValue("description", dtEdit.description);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<AcademicCalendarsTypes> = async (row) => {
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
