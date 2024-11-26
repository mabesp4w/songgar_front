/** @format */

import YearBar from "@/components/bar/Year";
import InputTextSearch from "@/components/input/InputTextSearch";
import SelectDef from "@/components/select/SelectDef";
import SelectTahun from "@/components/select/SelectTahun";
import month from "@/utils/month";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { Control } from "react-hook-form";

type SearchValues = {
  watchTermStart: string;
  start_date: string;
  end_date: string;
  cari: string;
};

type Props = {
  register: never;
  setValue: (name: string, value: string | number) => void;
  watch: (name?: string | string[] | undefined) => undefined;
  halaman: string;
  control: Control<SearchValues>;
  addClass?: string;
};

const Searching: FC<Props> = ({
  register,
  setValue,
  watch,
  control,
  addClass,
}) => {
  const yearWatch = watch("year") || "";

  const searchParams = useSearchParams();
  const router = useRouter();

  // watch
  const monthWatch = watch("month");

  useEffect(() => {
    if (monthWatch !== undefined) {
      const params = new URLSearchParams(window.location.search);
      if (monthWatch) {
        params.set("month", monthWatch || "");
      } else {
        params.delete("month");
      }
      router.replace(`?${params.toString()}`);
    }
  }, [router, monthWatch]);

  useEffect(() => {
    if (searchParams.get("month") !== null) {
      setValue("month", searchParams.get("month") || "");
    }
  }, [searchParams, setValue]);
  return (
    <div className={`grid grid-cols-8 gap-2 ${addClass}`}>
      <YearBar setValue={setValue} yearWatch={yearWatch} time={1000} />
      <SelectTahun
        placeholder="Pilih Tahun"
        control={control}
        name="year"
        start={new Date().getFullYear() - 2}
        end={new Date().getFullYear()}
        addClass="col-span-8 md:col-span-2 text-black"
      />
      <SelectDef
        placeholder="Pilih Bulan"
        control={control}
        name="month"
        options={month}
        addClass={"col-span-8 md:col-span-2 text-black"}
      />
      <InputTextSearch
        watch={watch as never}
        setValue={setValue}
        name="cari"
        register={register}
        placeholder={`Cari Event`}
        addClass="col-span-8 md:col-span-4"
      />
    </div>
  );
};

export default Searching;
