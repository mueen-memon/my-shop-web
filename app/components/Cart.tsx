'use-client'

import { useCartStore } from "@/store"
import { formatPrice } from "@/util/PriceFormat"
import { AnimatePresence, motion } from 'framer-motion'
import Image from "next/image"
import {
    IoAddCircle,
    IoRemoveCircle
} from 'react-icons/io5';

import basket from '@/public/wicker-basket.png'
import React from 'react'
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"

export default function Cart() {
    const cartStore = useCartStore()

    const cartTotal = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!;
    }, 0)

    return (
        // Cart
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cartStore.toggleCart()}
            className="fixed w-full h-screen left-0 top-0 bg-black/25"
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-base-200 absolute right-0 top-0 h-screen p-6 lg:p-12 overflow-scroll w-full lg:w-2/5 ">
                {cartStore.onCheckout === 'cart' && (
                    <button onClick={() => cartStore.toggleCart()} className="pb-4 text-sm font-bold" >back to store</button>
                )}
                {cartStore.onCheckout === 'checkout' && (
                    <button onClick={() => cartStore.setCheckout('cart')} className="pb-4 text-sm font-bold" >back to cart </button>
                )}
                {cartStore.onCheckout === 'checkout' && <Checkout />}
                {cartStore.onCheckout === 'success' && <OrderConfirmed />}
                {cartStore.onCheckout === 'cart' &&
                    <>
                        {cartStore.cart.map((item) => (
                            <motion.div layout key={item.id} className="flex p-4  my-4 rounded-lg gap-4 bg-base-100 ">
                                <Image
                                    className="rounded-md object-cover h-24 w-24 "
                                    src={item.image} alt="item.name" width={120} height={120} />
                                <div>
                                    <h2>{item.name}</h2>
                                    <div className="flex gap-2">
                                        <h2>Quantity: {item.quantity}</h2>
                                        <button onClick={() => cartStore.removeProduct({
                                            id: item.id,
                                            image: item.image,
                                            name: item.name,
                                            unit_amount: item.unit_amount,
                                            quantity: item.quantity
                                        })}>
                                            <IoRemoveCircle />
                                        </button>
                                        <button onClick={() => cartStore.addProduct({
                                            id: item.id,
                                            image: item.image,
                                            name: item.name,
                                            unit_amount: item.unit_amount,
                                            quantity: item.quantity
                                        })}>
                                            <IoAddCircle />
                                        </button>
                                    </div>
                                    <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </>
                }
                {cartStore.cart.length > 0 ? cartStore.onCheckout === 'cart' ? (
                    <motion.div layout>
                        <p className="text-right" >Total: {formatPrice(cartTotal)}</p>
                        <button onClick={() => cartStore.setCheckout('checkout')}
                            className="text-white py-2 mt-4 bg-primary rounded-md w-full">
                            Checkout
                        </button>
                    </motion.div>
                ) : null : cartStore.onCheckout === 'cart' && (
                    <AnimatePresence>
                        <motion.div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
                            initial={{ scale: 0.5, opacity: 0, rotateZ: -10 }}
                            animate={{ scale: 1, opacity: 0.75, rotateZ: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotateZ: -10 }}
                        >
                            <h1>Uhh... It&apos;s lonely here 😥</h1>
                            <Image src={basket} alt="empty cart" width={200} height={200} />

                        </motion.div>
                    </AnimatePresence>
                )
                }
            </div>

        </motion.div>
    )
}

