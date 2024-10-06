import { Button } from "@/components/ui/button";
import Image from "next/image";

const FLAGS = [
  {
    src: "/hr.svg",
    label: "Croatian",
  },
  {
    src: "/es.svg",
    label: "Spanish",
  },
  {
    src: "/fr.svg",
    label: "French",
  },
  {
    src: "/it.svg",
    label: "Italian",
  },
  {
    src: "/jp.svg",
    label: "Japanese",
  },
];

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        {FLAGS.map(({ label, src }) => (
          <Button key={label} size="lg" variant="ghost" className="w-full">
            <Image
              src={src}
              alt={label}
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            {label}
          </Button>
        ))}
      </div>
    </footer>
  );
};