import { MdOutlineHome } from "react-icons/md";
import { MdOutlineForum } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export const navlinks = [
  {
    name: "Home",
    icon: MdOutlineHome,
    link: "/",
  },
  {
    name: "Forum",
    icon: MdOutlineForum,
    link: "/forum",
  },
  {
    name: "Directory",
    icon: GoFileDirectory,
    link: "/directory",
  },
  {
    name: "Notification",
    icon: MdNotificationsNone,
    link: "/notification",
  },
  {
    name: "Message",
    icon: MdOutlineMessage,
    link: "/message",
  },
  {
    name: "Logout",
    icon: MdLogout,
    link: "/logout",
  },
];
