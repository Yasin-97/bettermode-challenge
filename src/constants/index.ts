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
    link: "/dashboard",
  },
  {
    name: "Forum",
    icon: MdOutlineForum,
    link: "/dashboard/forum",
  },
  {
    name: "Directory",
    icon: GoFileDirectory,
    link: "/dashboard/directory",
  },
  {
    name: "Notification",
    icon: MdNotificationsNone,
    link: "/dashboard/notification",
  },
  {
    name: "Message",
    icon: MdOutlineMessage,
    link: "/dashboard/message",
  },
  {
    name: "Logout",
    icon: MdLogout,
    link: "/logout",
  },
];
