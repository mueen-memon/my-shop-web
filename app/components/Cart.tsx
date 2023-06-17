'use-client'

import { useCartStore } from "@/store"
import Image from "next/image"

import React from 'react'

export default function Cart() {
    const cartStore = useCartStore()
    console.log(cartStore.isOpen);

    return (
        <div>Cart</div>
    )
}

