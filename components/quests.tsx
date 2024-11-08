import { Button } from "@/components/ui/button";
import { QUESTS } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "./ui/progress";

type Props = {
  points: number;
}

export const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">
          Quests
        </h3>
        <Link href={'/quests'}>
          <Button
            size={'sm'}
            variant={"primary-outline"}
          >
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => {
          const progress = points / quest.value * 100
          return (
            <div key={quest.title} className={cn("flex items-center w-full p-4 gap-x-4")}>
              <Image
                src="/points.svg"
                alt="Points"
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className={cn("text-neutral-700 text-lg font-bold")}>
                  {quest.title}
                </p>
                <Progress value={progress} className={cn("h-3")} />
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  );
};