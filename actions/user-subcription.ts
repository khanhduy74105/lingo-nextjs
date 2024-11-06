'use server'

import { getUserSubcription } from "@/db/queries";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server";

const returnUrl = absoluteUrl('/shop');

export const createStripeUrl = async () => {
    const {userId} = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        throw new Error('Unauthorized!')
    }

    const userSubcription = await getUserSubcription()

    if (userSubscription && userSubcription?.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubcription.stripeCustomerId,
            return_url: returnUrl
        })

        return {
            data: stripeSession.url
        }
    }
    const stripeSession = await stripe.checkout.sessions.create({
        mode:'subscription',
        payment_method_types: ['card'],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name:' Lingo Pro',
                        description: 'Unlimited heart'
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: 'month'
                    }
                }
            }
        ],
        metadata: {
            userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    })

    return {
        data: stripeSession.url
    }
}