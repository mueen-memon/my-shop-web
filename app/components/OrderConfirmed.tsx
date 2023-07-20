"use client";

import { motion } from "framer-motion";
import cheers from '../../public/cheers.gif'
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {

    const cartStore = useCartStore()

    useEffect(() => {
        cartStore.setPaymentIntent('')
        cartStore.clearCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckoutOrder = () => {
        setTimeout(() => {
            cartStore.setCheckout('cart')
        }, 1000)
        cartStore.toggleCart()
    }

    return (
        <motion.div
            className="flex items-center justify-center my-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className=" p-12 rounded-md text-center">
                <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
                <h2 className="text-sm my-4">Check your email for the receipt.</h2>
                <Image className="py-8" src={cheers} alt="cheers" />
                <div className="flex items-center justify-center gap-4 my-4">
                    <Link href={'/dashboard'}>
                        <button className="font-medium" onClick={handleCheckoutOrder}>
                            Check your Order
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
