'use client'

import { useCartStore } from "@/store"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
    const cartStore = useCartStore();
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Create an paymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            }),
        }).then((res) => {
            if(res.status == 403){
                return router.push("api/auth/signin")
            }
            return res.json()
        }).then((data) => {
            setClientSecret(data.paymentIntent.clientSecret)
            cartStore.setPaymentIntent(data.paymentIntent.id)
        })
    }, []);

    return (
        <div>Checkout</div>
    )
}
