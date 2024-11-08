'use client'

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subcription";
import { Button } from "@/components/ui/button";
import { POINTs_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubcription: boolean;
}

export const Items = ({
    hearts,
    points,
    hasActiveSubcription
}: Props) => {

    const [pending, startTransition] = useTransition();

    const onReFillHeart = () => {
        if (pending || hearts === 5 || points < POINTs_TO_REFILL) {
            return
        }

        startTransition(() => {
            refillHearts()
                .catch((e) => {
                    toast.error(e)
                })
        })
    }

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data
                    }
                })
                .catch(() => toast.error("Some went wrong"))
        })
    }
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 bordert2">
                <Image
                    src={'/heart.svg'}
                    alt="heart"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button
                    onClick={onReFillHeart}
                    disabled={hearts === 5 || points < POINTs_TO_REFILL}
                >
                    {hearts === 5 ? 'Full' : (
                        <div className="flex items-center">
                            <Image
                                src={'/points.svg'}
                                alt="points"
                                height={20}
                                width={20}
                            />
                            <p>{POINTs_TO_REFILL}</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image
                    src={'/unlimited.svg'}
                    alt='Unlimited'
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button
                    onClick={onUpgrade}
                    disabled={pending}
                >
                    {hasActiveSubcription ? 'settings' : 'upgrade'}
                </Button>
            </div>
        </ul>
    )
}
