'use client'

import { useCartStore } from "@/store"
import { formatPrice } from "@/util/PriceFormat"
import { getTotalPrice } from "@/util/helpers"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {

    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setIsLoading] = useState(false);
    const cartStore = useCartStore();
    const totalPrice = getTotalPrice(cartStore.cart);

    useEffect(() => {
        if (!stripe)
            return
        if (!clientSecret)
            return
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements)
            return
        setIsLoading(true)

        stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        }).then((result) => {
            if (!result.error) {
                cartStore.setCheckout("success")
            }
            setIsLoading(false)
        })
    }

    return (
        <>
            <form className='text-gray-600' onSubmit={handleSubmit} id="payment-form">
                <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
                <h1 className="py-4 text-sm font-bold">Total: {formatPrice(totalPrice)}</h1>
                <button className={`py-2 mt-4 w-full bg-teal-700 rounded-md text-white disabled:opacity-25`} id='submit' disabled={isLoading || !stripe || !elements}>
                    <span id="button-text">
                        {isLoading ? <span> Processing...</span> : 'Pay Now'}
                    </span>
                </button>
            </form>
        </>
    )
};
