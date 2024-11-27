/** @format */
import MenuTypes from "@/types/MenuTypes";
import { BsHouseDoorFill } from "react-icons/bs";
const createUrl = (path: string) => `${path}`;
const MainMenu: MenuTypes[] = [
  {
    name: "Login",
    href: "/auth/login",
    icon: <BsHouseDoorFill />,
  },
];
const ListMenu = [
  {
    name: "Home",
    href: "/",
    icon: <BsHouseDoorFill />,
  },
  {
    name: "Profil",
    slug: "profil",
    subMenus: [
      {
        name: "Visi Misi",
        href: createUrl("/profiles/visiMisi"),
      },
      {
        name: "Sejarah",
        href: createUrl("/profiles/history"),
      },
      {
        name: "Pegawai",
        href: createUrl("/profiles/employee"),
      },
      {
        name: "Sarana & Prasarana",
        href: createUrl("/profiles/facilities"),
      },
    ],
  },

  {
    name: "Pengumuman",
    href: createUrl("/announcements"),
  },
  {
    name: "Berita",
    href: "/news",
  },
  {
    name: "Kalender Akademik",
    href: createUrl("/akademik/calenderAkademik"),
  },
  {
    name: "Galeri",
    subMenus: [
      {
        name: "Galeri Foto",
        href: createUrl("/gallery/photo"),
      },
      {
        name: "Galeri Video",
        href: createUrl("/gallery/video"),
      },
    ],
  },
  {
    name: "Tentang Kami",
    href: "/abouts",
  },
];

export default ListMenu;
export { MainMenu };
