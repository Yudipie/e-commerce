import Stripe from "stripe";
import { NextResponse,NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req:NextRequest,res:NextResponse){
    
    const payload = await req.text();
    const response = JSON.parse(payload)
    const sig = req.headers.get("Stripe-signature")

    const dateTime = new Date(response?.created*1000).toLocaleDateString()
    const timeString = new Date(response?.created*1000).toLocaleDateString()

    try{
        let events = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

        console.log("event",events.type)

        return NextResponse.json({status: "success", event: events.type});

    }
    catch(err)
    {
        return NextResponse.json({status: "failed", err});
    }

    

}