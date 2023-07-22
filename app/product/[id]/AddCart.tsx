'use client'

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({ id, name, image, unit_amount, quantity }: AddCartType) {
    const cartStore = useCartStore();
    const [added, setAdded] = useState(false);

    console.log('content in add to cart', id, name, );

    const handleAddToCart = () => {
        cartStore.addProduct({ id, name, image, unit_amount, quantity })
        setAdded(true);
        setTimeout(() => {
            setAdded(false)
        }, 500)
    }

    return (
        <>
            <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={added}
                className="my-4 btn btn-primary w-full lg:max-w-lg md:max-w-lg">
                {!added && <span>Add to cart</span>}
                {added &&  <span>Adding to cart </span>}
            </button>
        </>
    )
};
