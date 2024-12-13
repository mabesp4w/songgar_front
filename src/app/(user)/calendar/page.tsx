/** @format */

import React from "react";
import ListFacilities from "./AcademicCalendar";

const page = () => {
  return (
    <section className="container grow  backdrop-blur-sm pt-10 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Kalender Akademik</h1>
      <ListFacilities />
    </section>
  );
};

export default page;
