import { 
    IoSearchOutline,
    IoNotificationsOutline,
    IoCreateOutline,
    IoHomeOutline 
} from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaPhone } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

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
    google: <FaGoogle />,
    phone: <FaPhone />
}