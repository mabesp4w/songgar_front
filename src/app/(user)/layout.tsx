/** @format */
"use client";
import { ReactNode } from "react";
import MenuContextProvider from "@/context/MenuContext";
import WelcomeContextProvider from "@/context/WelcomeContext";
import HeaderUser from "@/components/header/HeaderUser";
import FooterComp from "@/components/footer/FooterComp";
import dynamic from "next/dynamic";
// Memuat LuxyWrapper tanpa SSR
const LuxyWrapper = dynamic(
  () => import("@/components/animations/LuxyWrapper"),
  {
    ssr: false,
  }
);

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <MenuContextProvider>
      <WelcomeContextProvider>
        <main className="relative min-h-screen w-full font-roboto text-black flex flex-col justify-between gap-y-2">
          <HeaderUser />
          <LuxyWrapper className="grow min-h-full flex flex-col">
            {children}
            <FooterComp />
          </LuxyWrapper>
        </main>
      </WelcomeContextProvider>
    </MenuContextProvider>
  );
};

export default Layout;
