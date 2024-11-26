/** @format */
"use client";
import InputDateMinMax from "@/components/input/InputDateMinMax";
import InputFile from "@/components/input/InputFile";
import InputTextDefault from "@/components/input/InputTextDefault";
import NewsTypes from "@/types/NewsTypes";
import { momentId } from "@/utils/momentIndonesia";
import dynamic from "next/dynamic";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

const RichTextEditor = dynamic(
  () => import("@/components/input/RichTextEditor"),
  { ssr: false }
);
// news
type Props = {
  register: unknown;
  errors: FieldErrors<NewsTypes>;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showNews?: NewsTypes;
};
const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  setValue,
  watch,
  showNews,
}) => {
  // mindate 2 years ago
  const minDate = momentId().subtract(2, "years").format("YYYY-MM-DD");
  // maxdate now
  const maxDate = momentId().format("YYYY-MM-DD");
  return (
    <>
      <InputTextDefault
        label="Judul"
        name="title"
        register={register}
        errors={errors.title}
        required
        addClass="col-span-8"
        labelCss="text-zinc-200"
      />
      <InputDateMinMax
        label="Tgl. Berita"
        name="news_date"
        control={control}
        errors={errors.news_date}
        initialValue={showNews?.news_date || maxDate}
        required
        addClass="col-span-8 lg:col-span-2"
        minDate={minDate}
        maxDate={maxDate}
        labelCss="text-zinc-200"
      />
      <InputTextDefault
        label="Penulis"
        name="author"
        register={register}
        errors={errors.author}
        addClass="col-span-8 lg:col-span-6"
        labelCss="text-zinc-200"
      />
      <InputFile
        label="Gambar Utama"
        name="img_news"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        required={!showNews?.img_news}
        errors={errors.img_news}
        fileEdit={showNews?.img_news}
        initialValue={showNews?.img_news || ""}
        watch={watch}
        accept={"image/*"}
        labelCss="text-zinc-200"
      />
      <RichTextEditor
        control={control}
        name="content"
        label="Berita"
        addClass="col-span-8"
        required
        errors={errors.content}
        initialValue={showNews?.content || ""}
        setValue={setValue}
        labelCss="text-zinc-200"
      />
    </>
  );
};

export default BodyForm;
