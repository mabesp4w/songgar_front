/** @format */
"use client";
import InputDateMinMax from "@/components/input/InputDateMinMax";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useMajorsApi from "@/stores/api/Majors";
import AnnouncementsTypes from "@/types/AnnouncementsTypes";
import { momentId } from "@/utils/momentIndonesia";
import dynamic from "next/dynamic";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

const RichTextEditor = dynamic(
  () => import("@/components/input/RichTextEditor"),
  { ssr: false }
);

type Props = {
  register: unknown;
  errors: FieldErrors<AnnouncementsTypes>;
  dtEdit: AnnouncementsTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  dtEdit,
  setValue,
}) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  // store
  const { setMajorsAll, dtMajors } = useMajorsApi();
  // call setMajorsAll
  const getMajors = useCallback(async () => {
    setIsLoading(true);
    await setMajorsAll({});
    setIsLoading(false);
  }, [setMajorsAll]);

  useEffect(() => {
    getMajors();
  }, [getMajors]);

  // mindate 2 years ago
  const minDate = momentId().subtract(2, "years").format("YYYY-MM-DD");
  // maxdate now
  const maxDate = momentId().format("YYYY-MM-DD");
  return (
    <>
      {!isLoading && (
        <SelectFromDb
          label="Pilih Prodi"
          name="major_id"
          control={control}
          body={["id", "major_nm"]}
          dataDb={dtMajors}
          required
          errors={errors.major_id}
          addClass={"col-span-8"}
        />
      )}
      <InputTextDefault
        label="Judul"
        name="title"
        register={register}
        errors={errors.title}
        required
        addClass="col-span-8"
      />
      <InputDateMinMax
        label="Tgl. Pengumuman"
        name="announcement_date"
        control={control}
        errors={errors.announcement_date}
        initialValue={dtEdit?.announcement_date || maxDate}
        required
        addClass="col-span-8 lg:col-span-2"
        minDate={minDate}
        maxDate={maxDate}
      />
      <InputTextDefault
        label="Penulis"
        name="author"
        register={register}
        errors={errors.author}
        addClass="col-span-8 lg:col-span-6"
      />
      <RichTextEditor
        control={control}
        name="content"
        label="Pengumuman"
        addClass="col-span-8"
        required
        errors={errors.content}
        initialValue={dtEdit?.content || ""}
        setValue={setValue}
      />
    </>
  );
};

export default BodyForm;
