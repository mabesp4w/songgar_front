/** @format */

import React from "react";
import ListEmployee from "./ListEmployee";

const page = () => {
  return (
    <section className="container grow backdrop-blur-sm pt-10 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Pegawai</h1>
      <ListEmployee />
    </section>
  );
};

export default page;
