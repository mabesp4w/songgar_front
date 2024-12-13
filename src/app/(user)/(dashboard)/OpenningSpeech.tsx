/** @format */
"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

// Memuat ScrollRevealComponent tanpa SSR
const ScrollRevealComponent = dynamic(
  () => import("@/components/animations/ScrollRevealComponent"),
  {
    ssr: false,
  }
);

const OpenningSpeech: FC = () => {
  // state
  const [viewFactor, setViewFactor] = useState(0.5);
  useEffect(() => {
    const updateViewFactor = () => {
      // Cek jika lebar layar kurang dari 768px (mobile)
      if (window.innerWidth < 1050) {
        setViewFactor(0); // Untuk mobile
      } else {
        setViewFactor(0.5); // Untuk desktop
      }
    };

    updateViewFactor(); // Inisialisasi saat komponen pertama kali dirender
    window.addEventListener("resize", updateViewFactor); // Update saat resize

    return () => window.removeEventListener("resize", updateViewFactor);
  }, []);
  return (
    <article className="border border-slate-300 my-20 flex flex-col-reverse gap-y-10 lg:gap-y-0 lg:flex-row gap-x-4 px-2 bg-white/50 backdrop-blur-md">
      {/* image */}
      <div className="lg:self-start lg:mb-4">
        <ScrollRevealComponent
          selectorClass="img-kepsek"
          origin="left"
          distance="100px"
        >
          <div className="relative h-64 lg:w-[331px] mx-10">
            <Image
              src="/images/dekan.webp"
              alt="hero"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </ScrollRevealComponent>
        {/* name kepsek */}
        <div>
          <p className="font-medium text-center mt-2">
            Efraim Mangaluk, S.S., M.Hum
          </p>
          <p className="font-medium text-center">112345678</p>
        </div>
      </div>
      {/* openning speech */}
      <section className="grow w-full flex flex-col justify-between gap-y-5 md:gap-y-10 pt-2 pb-6">
        {/* title */}
        <div className="w-fit flex flex-col gap-1">
          <h3 className="text-xl md:text-2xl uppercase font-semibold">
            Sambutan Dekan
          </h3>
          {/* garis */}
          <ScrollRevealComponent
            selectorClass="hr"
            origin="top"
            distance="100px"
            className="w-[162px]  self-center"
            viewFactor={1}
          >
            <hr className="border border-slate-500" />
          </ScrollRevealComponent>
        </div>
        {/* content */}
        <ScrollRevealComponent
          selectorClass="content"
          origin="right"
          viewFactor={viewFactor}
          className="w-full flex flex-col gap-y-5 md:text-lg"
        >
          <p>Salam sejahtera bagi kita semua,</p>
          <p>
            Selamat datang di laman resmi Fakultas Pertanian Kehutanan Kelautan
            Universitas Ottow Geissler Papua. Sebagai dekan fakultas, saya
            merasa sangat bangga dapat menyambut Anda di rumah digital kami.
          </p>
          <p>
            Fakultas Pertanian Kehutanan Kelautan UOGP berkomitmen untuk
            menghasilkan lulusan yang berkualitas, inovatif, dan memiliki
            kepedulian tinggi terhadap lingkungan. Melalui program studi yang
            kami tawarkan, mahasiswa akan dibekali dengan pengetahuan dan
            keterampilan yang relevan dengan tantangan dunia pertanian,
            kehutanan, dan kelautan saat ini.
          </p>
          <p>
            Kami percaya bahwa website ini akan menjadi jembatan bagi kita untuk
            saling terhubung dan berbagi informasi. Di sini, Anda akan menemukan
            berbagai informasi terkait akademik, penelitian, pengabdian
            masyarakat, serta kegiatan mahasiswa.
          </p>
          <p>
            Mari bersama-sama membangun pertanian, kehutanan, dan kelautan yang
            berkelanjutan di Papua.
          </p>
          <p>Tuhan memberkati kita semua.</p>
        </ScrollRevealComponent>
      </section>
    </article>
  );
};

export default OpenningSpeech;
