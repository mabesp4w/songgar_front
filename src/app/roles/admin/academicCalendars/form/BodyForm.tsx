/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";
import InputDateMinMax from "@/components/input/InputDateMinMax";
import InputTextDefault from "@/components/input/InputTextDefault";
import AcademicCalendarsTypes from "@/types/AcademicCalendarsTypes";
import { momentId } from "@/utils/momentIndonesia";
import { FC } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors } from "react-hook-form";
// academicCalendars
type Props = {
  register: unknown;
  errors: FieldErrors<AcademicCalendarsTypes>;
  dtEdit: AcademicCalendarsTypes | null;
  control: unknown;
  watch: (name?: string | string[] | undefined) => undefined;
  setValue: unknown;
  showModal: boolean;
};

const BodyForm: FC<Props> = ({ errors, control, dtEdit, watch, register }) => {
  const minStartDate = momentId().subtract(4, "years").format("YYYY-MM-DD");
  // term End
  const watchStartDate = watch("start_date");
  return (
    <>
      <InputTextDefault
        label="Nama Event"
        name="nm_event"
        register={register}
        errors={errors.nm_event}
        required
        addClass="col-span-8"
      />
      <InputDateMinMax
        label="Tgl. Mulai"
        name="start_date"
        control={control}
        errors={errors.start_date}
        initialValue={dtEdit?.start_date || ""}
        required
        addClass="col-span-8 lg:col-span-2"
        minDate={minStartDate}
      />
      {watchStartDate && (
        <InputDateMinMax
          label="Tgl. Selesai"
          name="end_date"
          control={control}
          errors={errors.end_date}
          initialValue={dtEdit?.end_date || ""}
          addClass="col-span-8 lg:col-span-2"
          minDate={watchStartDate}
        />
      )}
      <InputTextDefault
        label="Ket"
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
