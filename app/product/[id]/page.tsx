import { formatPrice } from "@/util/PriceFormat"
import Image from "next/image"
import AddCart from "./AddCart"

export default function page({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-12 text-gray-700">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={800}
                height={800}
                className="rounded-lg max-h-[30rem] max-w-[30rem] object-cover"
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
                <AddCart {...searchParams}/>
            </div>
        </div>
    )
}
