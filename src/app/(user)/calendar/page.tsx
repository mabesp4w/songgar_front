/** @format */

import React from "react";
import ListFacilities from "./AcademicCalendar";

const page = () => {
  return (
    <section className="container grow mt-32 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Kalender Akademik</h1>
      <ListFacilities />
    </section>
  );
};

export default page;
