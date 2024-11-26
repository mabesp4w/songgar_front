/** @format */

import React from "react";
import ListFacilities from "./ListEmployee";

const page = () => {
  return (
    <section className="container grow mt-32 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Sarana Prasarana</h1>
      <ListFacilities />
    </section>
  );
};

export default page;
