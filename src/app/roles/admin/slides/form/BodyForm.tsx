/** @format */
"use client";
import InputFile from "@/components/input/InputFile";
import InputTextDefault from "@/components/input/InputTextDefault";
import SlidesTypes from "@/types/SlidesTypes";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";
// slides;
type Props = {
  register: unknown;
  errors: FieldErrors<SlidesTypes>;
  dtEdit: SlidesTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};

const BodyForm: FC<Props> = ({ register, errors, dtEdit, watch, setValue }) => {
  return (
    <>
      <InputTextDefault
        label="Judul"
        name="title"
        register={register}
        errors={errors.title}
        addClass="col-span-8 lg:col-span-7"
      />

      <InputTextDefault
        label="Posisi"
        name="position"
        register={register}
        required
        errors={errors.position}
        addClass="col-span-8 lg:col-span-1"
        valueAsNumber
        max={10}
        min={1}
        type="number"
      />

      <InputTextDefault
        label="Ket."
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-8"
      />

      <InputFile
        label="Gambar"
        name="img_slide"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        required
        errors={errors.img_slide}
        fileEdit={dtEdit?.img_slide}
        initialValue={dtEdit?.img_slide || ""}
        watch={watch}
        accept={"image/*"}
      />
    </>
  );
};

export default BodyForm;
