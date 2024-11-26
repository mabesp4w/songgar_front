/** @format */
"use client";
import InputDateMinMax from "@/components/input/InputDateMinMax";
import InputFile from "@/components/input/InputFile";
import InputRadio from "@/components/input/InputRadio";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectDef from "@/components/select/SelectDef";
import SelectFromDb from "@/components/select/SelectFromDB";
import useMajorsApi from "@/stores/api/Majors";
import EmployeesTypes from "@/types/EmployeesTypes";
import { momentId } from "@/utils/momentIndonesia";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

type Props = {
  register: unknown;
  errors: FieldErrors<EmployeesTypes>;
  dtEdit: EmployeesTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
  role: string;
};

const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  dtEdit,
  watch,
  setValue,
  role,
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

  const yearNow = momentId().format("YYYY");
  const minbirthdate = momentId(`${yearNow}-01-01`)
    .subtract(60, "years")
    .format("YYYY-MM-DD");
  const maxbirthdate = momentId(`${yearNow}-12-31`)
    .subtract(18, "years")
    .format("YYYY-MM-DD");

  const minHireDate = momentId().subtract(40, "years").format("YYYY-MM-DD");
  const maxHireDate = momentId().format("YYYY-MM-DD");
  return (
    <>
      {!isLoading && (
        <SelectFromDb
          label="Pilih Prodi"
          name="major_id"
          control={control}
          body={["id", "major_nm"]}
          dataDb={dtMajors}
          addClass={"col-span-8"}
        />
      )}
      <SelectDef
        label="Status"
        name="status"
        placeholder="Pilih Status"
        required
        control={control}
        errors={errors.status}
        addClass="col-span-8 lg:col-span-3"
        options={[
          { value: "aktif", label: "Aktif" },
          { value: "pensiun", label: "Pensiun" },
          { value: "pindah", label: "Pindah" },
        ]}
      />
      <InputTextDefault
        label="NIDN"
        name="NIP"
        register={register}
        errors={errors.NIP}
        addClass="col-span-8 lg:col-span-5"
      />
      <InputTextDefault
        label="Nama"
        name="nm_employee"
        register={register}
        required
        minLength={2}
        errors={errors.nm_employee}
        addClass="col-span-8"
      />

      <InputDateMinMax
        label="Tgl. Mulai Kerja"
        name="hire_date"
        control={control}
        errors={errors.hire_date}
        initialValue={dtEdit?.hire_date || ""}
        required
        addClass="col-span-8 lg:col-span-2"
        minDate={minHireDate}
        maxDate={maxHireDate}
      />
      <InputTextDefault
        label="No. HP"
        name="phone"
        register={register}
        required
        minLength={2}
        errors={errors.phone}
        addClass="col-span-8 lg:col-span-3"
      />
      {/* gender */}
      <div className="col-span-8 lg:col-span-3">
        <div className="w-[100%]">
          <label className="block py-2 text-sm font-medium text-gray-700 tracking-wide">
            Jenis Kelamin
          </label>
          <div className="flex gap-2">
            <InputRadio
              id="Laki-laki"
              name="gender"
              value="Laki-laki"
              register={register}
              required
              defaultChecked={dtEdit?.gender === "Laki-laki"}
            />
            <InputRadio
              id="Perempuan"
              name="gender"
              value="Perempuan"
              register={register}
              required
              defaultChecked={dtEdit?.gender === "Perempuan"}
            />
          </div>
          {errors?.gender?.type === "required" && (
            <p className="text-red-500 font-inter italic text-sm">
              Jenis kelamin tidak boleh kosong
            </p>
          )}
        </div>
      </div>
      <InputDateMinMax
        label="Tgl. Lahir"
        name="birthdate"
        control={control}
        errors={errors.birthdate}
        initialValue={dtEdit?.birthdate || ""}
        required
        addClass="col-span-8 lg:col-span-3"
        minDate={minbirthdate}
        maxDate={maxbirthdate}
      />
      <InputTextDefault
        label="Alamat"
        name="address"
        register={register}
        required
        minLength={2}
        errors={errors.address}
        addClass="col-span-8"
      />
      <InputFile
        label={`Foto ${role}`}
        name="img_employee"
        register={register}
        addClass="col-span-8"
        setValue={setValue}
        required
        errors={errors.img_employee}
        fileEdit={dtEdit?.img_employee}
        initialValue={dtEdit?.img_employee || ""}
        watch={watch}
        accept={"image/*"}
      />
    </>
  );
};

export default BodyForm;
