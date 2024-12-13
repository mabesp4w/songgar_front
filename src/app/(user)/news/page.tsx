/** @format */

import React from "react";
import ListNews from "./ListNews";

const page = () => {
  return (
    <section className="container grow  backdrop-blur-sm pt-10 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Berita FPKK</h1>
      <ListNews />
    </section>
  );
};

export default page;
