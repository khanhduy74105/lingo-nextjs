"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState } from "react";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChanlenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubcription={!!userSubscription?.isActive}
            />
        </>
    )
}