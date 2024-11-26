/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import VideosTypes from "@/types/galleries/VideosTypes";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// videos
type Props = {
  register: unknown;
  errors: FieldErrors<VideosTypes>;
  dtEdit: VideosTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <InputTextDefault
        label="Judul"
        name="title_video"
        register={register}
        errors={errors.title_video}
        required
        addClass="col-span-8"
      />
      <InputTextDefault
        label="Ket"
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-8"
      />
      <InputTextDefault
        label="Link Youtube"
        name="youtube_url"
        register={register}
        errors={errors.youtube_url}
        required
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
