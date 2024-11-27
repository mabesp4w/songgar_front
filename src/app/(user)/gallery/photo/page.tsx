/** @format */

import React from "react";
import ListPhoto from "./ListPhotos";

const page = () => {
  return (
    <section className="container grow mt-32 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">
        Kumpulan Foto FPKK
      </h1>
      <ListPhoto />
    </section>
  );
};

export default page;
