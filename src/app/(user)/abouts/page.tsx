/** @format */

import Link from "next/link";
import React from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";

const page = () => {
  return (
    <section className="container grow pt-10 bg-white/50 backdrop-blur-md">
      <h1 className="text-center font-hollirood md:text-2xl lg:text-3xl text-lg">
        FAKULTAS PERTANIAN KEHUTANAN KELAUTAN
      </h1>
      <div className=" flex gap-2 items-center mx-4 mt-4">
        <span className="font-semibold">Sosial Media :</span>
        <div className="flex gap-1 text-primary text-2xl">
          <Link href="https://www.facebook.com/fpkkuogp" target="_blank">
            <BiLogoFacebook className="hover:text-slate-50 cursor-pointer" />
          </Link>
          <Link href="https://www.instagram.com/fpkk_uogp/" target="_blank">
            <BiLogoInstagram className="hover:text-slate-50 cursor-pointer" />
          </Link>
          <Link href="https://www.facebook.com/" target="_blank">
            <BiLogoYoutube className="hover:text-slate-50 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="w-full mt-5 border">
        <iframe
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d3985.7473731977093!2d140.66613232463237!3d-2.5884854973895743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-2.587177914274806!2d140.66826736297756!5e0!3m2!1sen!2sid!4v1732736922734!5m2!1sen!2sid"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default page;
