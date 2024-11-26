/** @format */
"use client";
import SelectDef from "@/components/select/SelectDef";
import SelectFromDb from "@/components/select/SelectFromDB";
import useEmployeesApi from "@/stores/api/Employee";
import StrucruralsTypes from "@/types/StructuralsTypes";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

type Props = {
  register: unknown;
  errors: FieldErrors<StrucruralsTypes>;
  dtEdit: StrucruralsTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ errors, control }) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  // store
  const { setEmployeesAll, dtEmployees } = useEmployeesApi();
  // call setEmployeesAll
  const getEmployee = useCallback(async () => {
    setIsLoading(true);
    await setEmployeesAll({
      jabatan: "dosen",
    });
    setIsLoading(false);
  }, [setEmployeesAll]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return (
    <>
      {!isLoading && (
        <SelectFromDb
          label="Pilih Dosen"
          name="employee_id"
          control={control}
          body={["id", "nm_employee"]}
          dataDb={dtEmployees}
          required
          errors={errors.employee_id}
          addClass={"col-span-8"}
        />
      )}
      <SelectDef
        label="Pilih Jabatan"
        control={control}
        name="position"
        options={[
          { value: "Dekan", label: "Dekan" },
          { value: "Wakil Dekan I", label: "Wakil Dekan I" },
          { value: "Wakil Dekan II", label: "Wakil Dekan II" },
          { value: "Ketua Jurusan", label: "Ketua Jurusan" },
          { value: "Wakil Ketua Jurusan", label: "Wakil Ketua Jurusan" },
          { value: "Sekretaris", label: "Sekretaris" },
          { value: "Bendahara", label: "Bendahara" },
        ]}
        errors={errors.position}
        required
        addClass={"col-span-8"}
      />
    </>
  );
};

export default BodyForm;
