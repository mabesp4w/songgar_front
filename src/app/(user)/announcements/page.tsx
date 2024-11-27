/** @format */

import React from "react";
import ListAnnouncement from "./ListAnnouncement";

const page = () => {
  return (
    <section className="container grow mt-32 flex flex-col">
      <h1 className="text-center font-hollirood text-3xl">Pengumuman FPKK</h1>
      <ListAnnouncement />
    </section>
  );
};

export default page;
