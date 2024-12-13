/** @format */

import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="container grow  bg-white/50 backdrop-blur-md pt-10">
      <Image
        className="h-full w-full object-cover"
        width={100}
        height={100}
        src="/Struktur_Organisasi.png"
        alt="profile-picture"
      />
    </section>
  );
};

export default page;
