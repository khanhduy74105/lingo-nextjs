"use client"

import { courses, userProgress } from "@/db/schema"
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export const List = ({ courses, activeCourseId }: Props) => {
    const router = useRouter()
    const [pending, startTransition]= useTransition()

    const onClick = (id: number) => {
        if (pending) {
            return
        }

        if (id === activeCourseId) {
            return router.push("learn")
        }

        startTransition(() => {
            upsertUserProgress(id)
            .catch(() => {
                toast.error("Something went wrong")
            })
        })
    }

    return (<div className="pt-6 grid grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-4">
        {courses.map((course) => (
            <Card
                key={course.id}
                onClick={onClick}
                disabled={pending}
                active={course.id === activeCourseId}
                id={course.id}
                imageSrc={course.imageSrc}
                title={course.title}
            />
        ))}
    </div>)
}