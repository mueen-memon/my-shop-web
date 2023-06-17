'use client'

import { useCartStore } from "@/store"

export default function AddCart({id, name, image, unit_amount, quantity}: AddCartType) {
    const cartStore = useCartStore();
    return (
        <>
            <button onClick={() => cartStore.addProduct({id, name, image, unit_amount, quantity})} className="my-12 py-2 px-6 text-white bg-teal-700 rounded-md ">Add to cart</button>
        </>
    )
};
