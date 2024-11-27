/** @format */

import React from "react";
import ListVideo from "./ListVideo";

const page = () => {
  return (
    <section className="container grow mt-32 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">
        Kumpulan Video FPKK
      </h1>
      <ListVideo />
    </section>
  );
};

export default page;
