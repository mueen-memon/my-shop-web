import { ProductType } from '@/types/ProductType';
import { formatPrice } from '@/util/PriceFormat';
import Image from 'next/image';
import React from 'react'

export default function Product({ name, image, price }: ProductType) {
    return (
        <div>
            <Image src={image} width={400} height={400} alt={name}/>
            <h1>{name}</h1>
            {formatPrice(price as number)}
        </div>
    )
}
