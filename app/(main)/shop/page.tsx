import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubcription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    const userSubcriptionData = getUserSubcription();

    const [
        userProgress,
        userSubcription
    ] = await Promise.all([
        userProgressData,
        userSubcriptionData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses')
    }

    const isPro = !!userSubcription?.isActive

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src={'/shop.svg'}
                        alt="shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff
                    </p>
                    <Items
                        points={userProgress.points}
                        hearts={userProgress.hearts}
                        hasActiveSubcription={isPro}
                    />
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ShopPage