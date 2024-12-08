/** @format */

import React from "react";

const page = () => {
  return (
    <section className="container grow mt-32 px-8 text-lg pb-10">
      <h1 className="text-center font-hollirood text-3xl">Visi Misi</h1>
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-2xl font-bold">VISI</h3>
        <p>
          Menjadi Kampus Pilihan Masyarakat Papua Dibidang Pertanian, Kehutanan
          dan Kelautan.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-2xl font-bold">MISI</h3>
        <ol>
          <li>
            Menyelenggarakan Pendidikan Tinggi yang menghasilkan SDM berkompeten
            serta bermoral dibidang Pertanian, Kehutanan dan Kelautan.
          </li>
          <li>
            Mengembangkan dan menyebarluaskan IPTEKS dibidang Pertanian,
            Kehutanan dan Kelautan.
          </li>
          <li>
            Menjalin dan mengembangkan jejaring kemitraan serta menyediakan jasa
            layanan dibidang Pertanian, Kehutanan dan kelautan.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-2xl font-bold">TUJUAN</h3>
        <ol>
          <li>
            Terlaksanannya proses pendidikan yang berkualitas yang menghasilkan
            SDM yang kreatif, inovatif, bermoral Pancasila dan beriman Kristiani
            dalam penguasaan dan aplikasi IPTEKS
          </li>
          <li>
            Tercapainnya kapasitas institusi dalam Pengembangan konsep dan
            pemecahan masalah bidang Pertanian, Kehutanan dan Kelautan di Papua
          </li>
          <li>
            Terjalinnya dan berkembangnya jejaring kemitraan dengan berbagai
            pihak dibidang Pertanian, Kehutanan dan Kelautan
          </li>
        </ol>
      </div>
    </section>
  );
};

export default page;
