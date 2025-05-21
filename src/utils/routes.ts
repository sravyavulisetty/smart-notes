import type { LucideIcon } from "lucide-react";
import { Archive, House, Settings } from "lucide-react";

type SideBarRoute = {
    path: string;
    label: string;
    icon: LucideIcon;
  };
  
  export const sidebarRoutes: SideBarRoute[] = [
    {
      path: "/",
      label: "Home",
      icon: House,
    },
    {
        path: "/archive",
        label: "Archive",
        icon: Archive
    },
    {
        path: "/settings",
        label: "Settings",
        icon: Settings
    }
  ];
  