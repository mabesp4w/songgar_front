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
        href: createUrl("/profil/visiMisi"),
      },
      {
        name: "Sejarah",
        href: createUrl("/profil/sejarahSekolah"),
      },
      {
        name: "Guru dan Tendik",
        href: createUrl("/profil/guruTendik"),
      },
      {
        name: "Sarana & Prasarana",
        href: createUrl("/profil/saranaPrasarana"),
      },
    ],
  },
  {
    name: "Kalender Akademik",
    href: createUrl("/akademik/kalenderAkademik"),
  },
  {
    name: "Galeri",
    subMenus: [
      {
        name: "Galeri Foto",
        href: createUrl("/galeri/foto"),
      },
      {
        name: "Galeri Video",
        href: createUrl("/galeri/video"),
      },
    ],
  },

  {
    name: "Pengumuman",
    href: createUrl("/akademik/kalenderAkademik"),
  },
  {
    name: "Berita",
    href: "/berita",
  },
  {
    name: "Tentang Kami",
    href: "/about",
  },
];

export default ListMenu;
export { MainMenu };
