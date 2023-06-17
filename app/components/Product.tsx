import { formatPrice } from '@/util/PriceFormat';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Product({ name, image, unit_amount, description, metadata, id }: ProductType) {

    const { features } = metadata;

    return (
        <Link href={{ pathname: `/product/${id}`, query: { name, image, unit_amount, description, features, id } }}>
            <div className='text-gray-700'>
                <Image src={image}
                    width={800}
                    height={800}
                    alt={name}
                    className='w-full h-80 object-cover rounded-lg'
                />
                <div className='font-medium py-2'>
                    <h1>{name}</h1>
                    <h2 className='text-sm text-teal-700'>{unit_amount && formatPrice(unit_amount)}</h2>
                </div>
            </div>
        </Link>
    )
}
