/** @format */
"use client";
import { ReactNode } from "react";
import MenuContextProvider from "@/context/MenuContext";
import WelcomeContextProvider from "@/context/WelcomeContext";
import HeaderUser from "@/components/header/HeaderUser";
import FooterComp from "@/components/footer/FooterComp";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <MenuContextProvider>
      <WelcomeContextProvider>
        <main className="relative min-h-screen w-full font-roboto text-black flex flex-col justify-between gap-y-2 bg-sawah bg-cover bg-fixed bg-no-repeat">
          <HeaderUser />
          <main className="grow min-h-full flex flex-col">
            {children}
            <FooterComp />
          </main>
        </main>
      </WelcomeContextProvider>
    </MenuContextProvider>
  );
};

export default Layout;
