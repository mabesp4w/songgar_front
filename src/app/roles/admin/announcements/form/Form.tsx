/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import useAnnouncements from "@/stores/crud/Announcements";
import BtnDefault from "@/components/button/BtnDefault";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { momentId } from "@/utils/momentIndonesia";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: AnnouncementsTypes | null;
  halaman: string;
};
// announcements
const Form = ({ showModal, setShowModal, dtEdit, halaman }: Props) => {
  // date
  const maxDate = momentId().format("YYYY-MM-DD");
  // store
  const { addData, updateData } = useAnnouncements();
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
  } = useForm<AnnouncementsTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("title", "");
    setValue("content", "");
    setValue("author", "");
    setValue("slug", "");
    setValue("major_id", "");
    setValue("announcement_date", maxDate);
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("title", dtEdit.title);
      setValue("content", dtEdit.content);
      setValue("author", dtEdit.author);
      setValue("slug", dtEdit.slug);
      setValue("major_id", dtEdit.major_id);
      setValue("announcement_date", dtEdit.announcement_date);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<AnnouncementsTypes> = async (row) => {
    //  submit data
    // console.log({ row });
    // return;
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
      width="md:w-[50rem] lg:w-[65rem]"
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
