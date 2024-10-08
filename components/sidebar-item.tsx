"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  label: string;
  iconSrc: string;
  href: string;
}

export const SidebarItem = ({ href, iconSrc, label }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebar-outline" : "sidebar"}
      className="justify-start"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};