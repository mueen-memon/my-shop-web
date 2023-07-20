'use client'

import { useCartStore, useThemeStore } from "@/store"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CheckoutForm from "./CheckoutForm"
import OrderAnimation from "./OrderAnimation"
import { motion } from "framer-motion"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
    const cartStore = useCartStore();
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();
    const themeStore = useThemeStore()
    const [stripeTheme, setStripeTheme] = useState<'flat' | 'stripe' | 'night' | 'none'>('stripe');

    useEffect(() => {
        // Seting the theme on stripe
        if(themeStore.mode === 'dark') {
            setStripeTheme('night')
        }else{
            setStripeTheme('stripe')
        }
        // Create an paymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            }),
        }).then((res) => {
            if (res.status == 403) {
                return router.push("api/auth/signin")
            }
            return res.json()
        }).then((data) => {
            setClientSecret(data.paymentIntent.client_secret)
            cartStore.setPaymentIntent(data.paymentIntent.id)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: stripeTheme,
            labels: 'floating',
        },
    }

    return (
        <div>
            {!clientSecret && <OrderAnimation />}
            {clientSecret && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                </motion.div>
            )}
        </div>
    )
}

