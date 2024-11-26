/** @format */

"use client";
import ListMenu from "./ListMenu";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItems";

const NavbarComp: FC = ({}) => {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  const halfIndex = Math.ceil(ListMenu.length / 2);
  const firstHalf = ListMenu.slice(0, halfIndex);
  const secondHalf = ListMenu.slice(halfIndex);

  return (
    <div className="relative text-sm">
      <ul className="flex gap-x-4 whitespace-nowrap lg:w-2/6 xl:w-[30%] justify-between absolute left-0">
        {firstHalf.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
            pathname={pathname}
            addClass={
              index === 0
                ? "justify-self-start"
                : index === firstHalf.length - 1
                ? "justify-self-end"
                : "justify-self-center"
            }
          />
        ))}
      </ul>
      <ul className="flex gap-x-4 whitespace-nowrap lg:w-2/6 xl:w-[30%] justify-between absolute right-0">
        {secondHalf.map((item, index) => (
          <MenuItem
            key={index + halfIndex} // Ensure unique key for the second half
            item={item}
            index={index + halfIndex}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
            pathname={pathname}
            addClass={
              index === 0
                ? "justify-self-start"
                : index === firstHalf.length - 1
                ? "justify-self-end"
                : "justify-self-center"
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default NavbarComp;
