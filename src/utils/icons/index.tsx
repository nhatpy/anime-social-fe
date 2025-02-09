import { 
    FaFacebookF, 
    FaInstagram, 
    FaTwitter, 
    FaYoutube, 
    FaPhone,
    FaHeart,
    FaComment,
    FaEye 
} from "react-icons/fa";

import { 
    IoSearchOutline,
    IoNotificationsOutline,
    IoCreateOutline,
    IoHomeOutline,
    IoClose,
} from "react-icons/io5";

import { LuUserRound } from "react-icons/lu";
import { 
    IoIosArrowDown,
    IoMdTime,  
} from "react-icons/io";
import { 
    RiLockPasswordLine, 
    RiDeleteBinLine 
} from "react-icons/ri";

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
}