import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
    return new NextResponse(JSON.stringify({
        reaaaq: req.body
       }), {status: 200})
}

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        )
        console.log(event)
    } catch (error) {
        return new NextResponse(`Webhook error: ${error}`, {
            status: 400
        })
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const subcription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is required", {
                status: 400
            })
        }

        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeSubscriptionId: subcription.id,
            stripeCustomerId: subcription.customer as string,
            stripePriceId: subcription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subcription.current_period_end * 1000
            )
        })
    }

    if (event.type === 'invoice.payment_succeeded') {
        const subcription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await db.update(userSubscription).set({
            stripePriceId: subcription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subcription.current_period_end * 1000
            ),
        }).where(eq(userSubscription.stripeSubscriptionId, subcription.id))
    }

    return new NextResponse(null, {status: 200})
}