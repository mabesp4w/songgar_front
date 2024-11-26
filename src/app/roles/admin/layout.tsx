/** @format */

import FooterComp from "@/components/footer/FooterComp";
import HeaderComp from "@/components/header/HeaderComp";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import MenuContextProvider from "@/context/MenuContext";
import WelcomeContextProvider from "@/context/WelcomeContext";
import MobileSide from "@/components/sidebar/Mobile";
import Auth from "@/app/Auth";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <MenuContextProvider>
      <WelcomeContextProvider>
        <div className="min-h-screen w-full font-roboto text-black overflow-hidden bg-4 bg-cover bg-fixed">
          {/* sidebar */}
          <div className="fixed left-0 top-0 bottom-0 lg:w-52 bg-fourth/80 z-50 hidden lg:block">
            <Sidebar />
          </div>
          <div className="w-full flex">
            <div className="lg:ml-52 flex flex-col min-h-screen grow overflow-hidden w-full ">
              {/* judul */}
              <div className="h-10 shadow-sm shadow-fourth text-gray-300">
                <HeaderComp />
              </div>
              {/* mobile menu */}
              <MobileSide />

              {/* content */}
              <div className="grow px-4 lg:mr-2 rounded-lg py-2 text-gray-300">
                {children}
              </div>
              {/* footer */}
              <div className="min-h-12 flex items-center justify-center bg-fourth/80 text-third">
                <FooterComp />
              </div>
            </div>
          </div>
        </div>
        <Auth />
      </WelcomeContextProvider>
    </MenuContextProvider>
  );
};

export default layout;
