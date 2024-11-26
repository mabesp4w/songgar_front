/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderComp = () => {
  const { isOpen, setIsOpen } = useMenuContext();
  const { welcome, setWelcome } = useWelcomeContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setWelcome("Selamat Datang di Halaman Admin");
    } else {
      // split the pathname
      const path = pathname?.split("/");
      setWelcome(`Halaman ${path[path.length - 1]}`);
    }

    return () => {};
  }, [pathname, setWelcome]);

  // ketika pathname berubah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  // console.log({ isOpen });
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between lg:justify-center z-50 mt-2">
      <h3 className="capitalize text-xl z-50 font-bold w-full text-center">
        {welcome}
      </h3>
      <GiHamburgerMenu
        className="lg:hidden cursor-pointer z-50 select-none mr-4 self-center "
        onClick={handleClick}
      />
    </div>
  );
};

export default HeaderComp;
