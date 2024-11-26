/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BtnDefault from "@/components/button/BtnDefault";
import NewsTypes from "@/types/NewsTypes";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { momentId } from "@/utils/momentIndonesia";
import BodyForm from "./BodyForm";
import useNews from "@/stores/crud/News";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";

const Form = ({}) => {
  // news
  // router
  const router = useRouter();
  // date
  const maxDate = momentId().format("YYYY-MM-DD");
  // store
  const { addData, updateData, setShowNews, showNews } = useNews();
  // state
  const [isLoading, setIsLoading] = useState(false);
  //   search params
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // get showNews
  useEffect(() => {
    setShowNews(id || "");
  }, [id, setShowNews]);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<NewsTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("title", "");
    setValue("content", "");
    setValue("author", "");
    setValue("slug", "");
    setValue("news_date", maxDate);
    setValue("img_news", "");
  };

  // data edit
  useEffect(() => {
    if (showNews && id) {
      setValue("id", showNews.id);
      setValue("title", showNews.title);
      setValue("content", showNews.content);
      setValue("author", showNews.author);
      setValue("slug", showNews.slug);
      setValue("news_date", showNews.news_date);
      setValue("img_news", "");
      console.log({ id });
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNews, id]);
  // simpan data
  const goTo = () => {
    router.push("/roles/admin/news");
  };

  const onSubmit: SubmitHandler<NewsTypes> = async (row) => {
    //  submit data
    // console.log({ row });
    // return;
    submitData({
      row,
      setIsLoading,
      addData,
      updateData,
      resetForm,
      toastShow,
      goTo,
      dtEdit: id ? showNews : null,
    });
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />
        <div className="grid grid-cols-8 gap-2 mb-4 text-black">
          <BodyForm
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            setValue={setValue}
            showNews={showNews}
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <BtnDefault onClick={handleSubmit(onSubmit)} type="submit">
              Simpan
            </BtnDefault>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
