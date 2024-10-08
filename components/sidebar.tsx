import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/sidebar-item";


interface Props {
  className?: string;
}

const sidebarRoutes = [
  {
    label: "Learn",
    iconSrc: "/learn.svg",
    href: "/learn",
  },
  {
    label: "Leaderboard",
    iconSrc: "/leaderboard.svg",
    href: "/leaderboard",
  },
  {
    label: "Quests",
    iconSrc: "/quests.svg",
    href: "/quests",
  },
  {
    label: "Shop",
    iconSrc: "/shop.svg",
    href: "/shop",
  },
];

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 select-none">
          <Image src="/mascot.svg" alt="Lingo" width={40} height={40} />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarRoutes.map((route) => (
          <SidebarItem key={route.href} {...route} />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};