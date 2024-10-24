"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState } from "react";
import { QuestionBubble } from "./question-buble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";

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
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return unCompletedIndex === -1 ? 0 : unCompletedIndex
    })

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex]
    const options = challenge?.challengeOptions ?? []

    const onSelect = (id: number) => {
        if (status !== 'none') {
            return
        }
        setSelectedOption(id)
    }

    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question
    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubcription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full items-center justify-center flex">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div className="">
                            {
                                challenge.type === 'ASSIST' && (
                                    <QuestionBubble
                                        question={challenge.question}
                                    />
                                )
                            }
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={()=>{}}
            />
        </>
    )
}