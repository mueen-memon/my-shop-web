import { SearchParamTypes } from "@/types/SearchParamTypes"
import { formatPrice } from "@/util/PriceFormat"
import Image from "next/image"

export default function page({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex justify-between gap-24 p-12 text-gray-700">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={800}
                height={800}
                className="rounded-lg h-[30rem] w-[30rem] object-cover"
            />
            <div className="description text-gray-700">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>

                {searchParams.features != '' &&
                    <p className="py-2">{searchParams.features}</p>
                }

                <div className="flex gap-2">
                    <p className="font-bold text-teal-700">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
                </div>
                <button className="my-12 py-2 px-6 text-white bg-teal-700 rounded-md ">Add to cart</button>
            </div>
        </div>
    )
}
