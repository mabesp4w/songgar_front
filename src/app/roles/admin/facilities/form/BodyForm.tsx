/** @format */
"use client";
import InputFile from "@/components/input/InputFile";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectDef from "@/components/select/SelectDef";
import FacilitiesTypes from "@/types/FacilitiesTypes";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// facilities
type Props = {
  register: unknown;
  errors: FieldErrors<FacilitiesTypes>;
  dtEdit: FacilitiesTypes | null;
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
  watch,
}) => {
  return (
    <>
      <InputTextDefault
        label="Nama Fasilitas"
        name="nm_facility"
        register={register}
        errors={errors.nm_facility}
        required
        addClass="col-span-8"
      />
      <InputTextDefault
        label="Jumlah"
        name="quantity"
        register={register}
        errors={errors.quantity}
        required
        type="number"
        min={1}
        addClass="col-span-8 md:col-span-2"
      />
      <SelectDef
        label="Tipe"
        placeholder="Pilih Tipe"
        required
        control={control}
        errors={errors.type}
        name="type"
        options={[
          { value: "Sarana", label: "Sarana" },
          { value: "Prasarana", label: "Prasarana" },
        ]}
        addClass="col-span-8 md:col-span-3"
      />
      <SelectDef
        label="Kondisi"
        placeholder="Pilih Kondisi"
        required
        control={control}
        errors={errors.condition}
        name="condition"
        options={[
          { value: "Baik", label: "Baik" },
          { value: "Rusak", label: "Rusak" },
          { value: "Sedang Diperbaiki", label: "Sedang Diperbaiki" },
        ]}
        addClass="col-span-8  md:col-span-3"
      />
      <InputTextDefault
        label="Lokasi"
        name="location"
        register={register}
        errors={errors.location}
        addClass="col-span-8"
      />

      <InputTextDefault
        label="Ket"
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-8"
      />
      <InputFile
        label="Gambar Utama"
        name="img_facility"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        fileEdit={dtEdit?.img_facility}
        initialValue={dtEdit?.img_facility || ""}
        watch={watch}
        accept={"image/*"}
      />
    </>
  );
};

export default BodyForm;
