import { auth } from "@clerk/nextjs/server"

const allowedIds = [
    "user_2n3kLceAnKQrzgsi8IUeaNnt1uf"
]

export const getIsAdmin = () => {
    const {userId} = auth()

    if (!userId) {
        return false
    }

    return allowedIds.indexOf(userId) !== -1
}