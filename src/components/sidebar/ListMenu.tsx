/** @format */
import MenuTypes from "@/types/MenuTypes";

import {
  BsActivity,
  BsAlarm,
  BsCalendar,
  BsHouseDoor,
  BsImages,
  BsNewspaper,
  BsPerson,
  BsPlayBtnFill,
} from "react-icons/bs";

const createUrl = (path: string) => `/roles/admin${path}`;

const setAdminMenus = async () => {
  const ListMenu: MenuTypes[] = [
    {
      name: "Home",
      href: createUrl("/dashboard"),
      icon: <BsHouseDoor />,
    },
    {
      name: "Pengumuman",
      href: createUrl("/announcements"),
      icon: <BsActivity />,
    },
    {
      name: "Berita",
      href: createUrl("/news"),
      icon: <BsNewspaper />,
    },

    {
      name: "Slide",
      href: createUrl("/slides"),
      icon: <BsPlayBtnFill />,
    },
    {
      name: "Galeri",
      slug: "galleries",
      icon: <BsImages />,
      subMenus: [
        {
          name: "Foto",
          href: createUrl("/galleries/photos"),
        },
        {
          name: "Vidio",
          href: createUrl("/galleries/videos"),
        },
      ],
    },
    {
      name: "Pegawai / Staf",
      slug: "employees",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Dosen",
          href: createUrl("/employees/dosen"),
        },
        {
          name: "Staf",
          href: createUrl("/employees/staf"),
        },
        {
          name: "Satpam",
          href: createUrl("/employees/satpam"),
        },
        {
          name: "Pekarya",
          href: createUrl("/employees/pekarya"),
        },
      ],
    },

    {
      name: "Jabatan Struktural",
      href: createUrl("/structurals"),
      icon: <BsActivity />,
    },
    {
      name: "Kalender Akademik",
      href: createUrl("/academicCalendars"),
      icon: <BsCalendar />,
    },

    {
      name: "Fasilitas",
      href: createUrl("/facilities"),
      icon: <BsAlarm />,
    },
  ];

  return ListMenu;
};

export { setAdminMenus };
