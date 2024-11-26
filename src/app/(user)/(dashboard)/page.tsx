/** @format */
"use client";

import Image from "next/image";
import Sliders from "./Sliders";
import dynamic from "next/dynamic";
import Announcement from "./Announcement";
import News from "./News";
import OpenningSpeech from "./OpenningSpeech";
// Memuat ScrollRevealComponent tanpa SSR
const ScrollRevealComponent = dynamic(
  () => import("@/components/animations/ScrollRevealComponent"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="md:container mx-auto w-screen">
      <section className="h-[15rem] md:h-[20rem] lg:h-[38rem] flex mt-[5.6rem]">
        <Sliders />
      </section>
      {/* kepsek */}
      <OpenningSpeech />
      {/* announcement and news */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4 my-16 ">
        {/* announcement */}
        <ScrollRevealComponent
          selectorClass="announcement"
          className="w-auto lg:w-[30%]"
          origin="left"
          viewFactor={1}
        >
          <Announcement />
        </ScrollRevealComponent>
        {/* news */}
        <ScrollRevealComponent
          selectorClass="news"
          className="w-full lg:w-[50%]"
          origin="right"
          viewFactor={1}
        >
          <News />
        </ScrollRevealComponent>
        <ScrollRevealComponent
          selectorClass="baca"
          className="w-full lg:w-[17%] relative hidden lg:flex"
          origin="right"
        >
          <Image
            src="/images/assets/undraw_Ideas_flow_re_bmea.png"
            alt="Baca"
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "fill",
              objectPosition: "top",
            }}
          />
        </ScrollRevealComponent>
      </section>
    </main>
  );
}
