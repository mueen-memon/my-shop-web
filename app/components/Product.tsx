import { ProductType } from '@/types/ProductType';
import { formatPrice } from '@/util/PriceFormat';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Product({id, name, image, unit_amount, description, metadata  }: ProductType) {

    const { features } = metadata;

    return (
        <Link href={{ pathname: `/product/${id}`, query: {id, name, image, unit_amount, description, features} }}>
            <div >
                <Image src={image}
                    width={800}
                    height={800}
                    alt={name}
                    className='w-full h-80 object-cover rounded-lg'
                    priority={true}
                />
                <div className='font-medium py-2'>
                    <h1>{name}</h1>
                    <h2 className='text-sm text-primary'>{unit_amount && formatPrice(unit_amount)}</h2>
                </div>
            </div>
        </Link>
    )
}
