/** @format */
"use client";
import InputFile from "@/components/input/InputFile";
import InputTextDefault from "@/components/input/InputTextDefault";
import PhotosTypes from "@/types/galleries/PhotosTypes";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// photos
type Props = {
  register: unknown;
  errors: FieldErrors<PhotosTypes>;
  dtEdit: PhotosTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors, dtEdit, setValue, watch }) => {
  return (
    <>
      <InputTextDefault
        label="Judul"
        name="title_photo"
        register={register}
        errors={errors.title_photo}
        required
        addClass="col-span-8"
      />
      <InputTextDefault
        label="Ket."
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-8 lg:col-span-6"
      />
      <InputFile
        label="Gambar Utama"
        name="photo_path"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        required={!dtEdit?.photo_path}
        errors={errors.photo_path}
        fileEdit={dtEdit?.photo_path}
        initialValue={dtEdit?.photo_path || ""}
        watch={watch}
        accept={"image/*"}
      />
    </>
  );
};

export default BodyForm;
