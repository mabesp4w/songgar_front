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
    <article className="border border-slate-300 my-20 flex flex-col-reverse gap-y-10 lg:gap-y-0 lg:flex-row gap-x-4 px-2">
      {/* image */}
      <div className="lg:self-end lg:mb-4">
        <ScrollRevealComponent
          selectorClass="img-kepsek"
          origin="left"
          distance="100px"
        >
          <div className="relative h-64 md:h-80 lg:h-[454px] lg:w-[331px] mx-10">
            <Image
              src="/images/kepsek.png"
              alt="hero"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </ScrollRevealComponent>
        {/* name kepsek */}
        <ScrollRevealComponent
          selectorClass="name-kepsek"
          origin="left"
          distance="100%"
          viewFactor={0}
        >
          <p className="font-medium text-center mt-2">
            Oktavianus Payung Rantetau, S.Pd.,Gr
          </p>
          <p className="font-medium text-center">112345678</p>
        </ScrollRevealComponent>
      </div>
      {/* openning speech */}
      <section className="grow w-full flex flex-col justify-between gap-y-5 md:gap-y-10 pt-2 pb-6">
        {/* title */}
        <div className="w-fit flex flex-col gap-1">
          <h3 className="text-xl md:text-2xl uppercase font-semibold">
            Sambutan Kepala Sekolah
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
            Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas
            segala rahmat dan karunia-Nya sehingga kita dapat terus berjuang
            dalam meningkatkan mutu pendidikan di sekolah ini.
          </p>
          <p>
            Selamat datang di situs resmi Sekolah YPPK. Kami berharap kehadiran
            website ini dapat menjadi jendela informasi yang bermanfaat bagi
            semua pihak—baik siswa, orang tua, alumni, maupun masyarakat luas.
            Melalui platform ini, kami ingin memperkenalkan lebih dalam tentang
            visi, misi, program, serta berbagai kegiatan yang ada di sekolah
            kami.
          </p>
          <p>
            Sekolah YPPK berkomitmen untuk memberikan pendidikan berkualitas
            yang berlandaskan nilai-nilai Kristiani. Dengan dukungan dari
            seluruh civitas akademika, kami terus berupaya menciptakan
            lingkungan belajar yang kondusif dan inspiratif bagi pengembangan
            potensi siswa, baik dalam aspek akademik maupun karakter.
          </p>
          <p>
            Akhir kata, kami ucapkan selamat berselancar di website sekolah ini.
            Semoga informasi yang disajikan dapat memberikan manfaat dan menjadi
            sarana yang efektif dalam mendukung pendidikan di Sekolah YPPK.
          </p>
          <p>Tuhan memberkati kita semua.</p>
        </ScrollRevealComponent>
      </section>
    </article>
  );
};

export default OpenningSpeech;
