"use server"

import db from "@/db/drizzle"
import { getCourseById, getUserProgress } from "@/db/queries"
import { userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth()
    const user = await currentUser()
    if (!user || !userId) {
        throw new Error("Unauthoried")
    }

    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found")
    }

    // TOdo : enable once units and lessons are added

    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.fullName || "User",
            userImageSrc: user.imageUrl || "/mascos.svg"
        })
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.fullName || 'user',
        userImageSrc: user.imageUrl || "/mascos.svg"
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}