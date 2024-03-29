import { formatPrice } from "@/util/PriceFormat"
import Image from "next/image"
import AddCart from "./AddCart"
import { SearchParamTypes } from "@/types/SearchParamTypes";

export default function Product({ searchParams, params}: SearchParamTypes) {
    
    return (
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={800}
                height={800}
                priority={true}
                className="rounded-lg h-[18rem] lg:h-[25rem] max-h-[25rem] w-full sm:max-w-[15rem] lg:max-w-[25rem]  object-cover"
            />
            <div className="font-medium">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>

                {searchParams.features != '' &&
                    <p className="py-2">{searchParams.features}</p>
                }

                <div className="flex gap-2">
                    <p className="font-bold text-primary">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
                </div>
                <AddCart {...searchParams}/>
            </div>
        </div>
    )
}
