import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaHeart,
  FaComment,
  FaEye,
  FaChevronUp,
  FaBars,
  FaBook,
  FaSignOutAlt,
  FaChartBar,
  FaTag,
  FaAudible,
  FaAudioDescription,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoCreateOutline,
  IoHomeOutline,
  IoClose,
  IoDiamondOutline,
} from "react-icons/io5";

import { LuUserRound } from "react-icons/lu";
import { IoIosArrowDown, IoMdTime } from "react-icons/io";
import {
  RiLockPasswordLine,
  RiDeleteBinLine,
  RiErrorWarningFill,
  RiUploadCloud2Fill,
} from "react-icons/ri";
import { MdCategory, MdOutlineTipsAndUpdates } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";

export const icons = {
  search: <IoSearchOutline />,
  notification: <IoNotificationsOutline />,
  user: <LuUserRound />,
  create: <IoCreateOutline />,
  down: <IoIosArrowDown />,
  home: <IoHomeOutline />,
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  instagram: <FaInstagram />,
  password: <RiLockPasswordLine />,
  phone: <FaPhone />,
  time: <IoMdTime />,
  eye: <FaEye />,
  heart: <FaHeart />,
  comment: <FaComment />,
  delete: <RiDeleteBinLine />,
  close: <IoClose />,
  up: <FaChevronUp />,
  diamond: <IoDiamondOutline />,
  chapter: <FaBars />,
  book: <FaBook />,
  logout: <FaSignOutAlt />,
  iconwithI: <RiErrorWarningFill />,
  chart: <FaChartBar />,
  upload: <RiUploadCloud2Fill />,
  tag: <FaTag />,
  status: <FaAudible />,
  description: <FaAudioDescription />,
  more: <FaPlus />,
  left: <FaChevronLeft />,
  right: <FaChevronRight />,
  category: <MdCategory />,
  update: <MdOutlineTipsAndUpdates />,
  admin: <GrUserAdmin />,
};
