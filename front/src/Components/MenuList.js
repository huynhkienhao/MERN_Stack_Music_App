import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { BiPulse, BiSearchAlt } from "react-icons/bi";

import { FaBroadcastTower, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";

const MenuList = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Trang chủ",
    path: "/",
  },

  {
    id: 2,
    icon: <BiSearchAlt />,
    name: "Tìm kiếm",
    path: "/search",
  },
  {
    id: 3,
    icon: <FaMicrophoneAlt />,
    name: "Nghệ sĩ",
    path: "/artist",
  },
  {
    id: 4,
    icon: <BsJournalAlbum />,
    name: "Album",
    path: "/albums",
  },
  {
    id: 5,
    icon: <BsJournalAlbum />,
    name: "Thư viện nhạc",
    path: "/library",
  },

  {
    id: 6,
    icon: <BsJournalAlbum />,
    name: "Danh sách phát",
    path: "/playlists",
  },

  {
    id: 7,
    icon: <BsJournalAlbum />,
    name: "Admin",
    path: "/admin",
  },
];

export { MenuList };
