import { formatPrice } from "@/util/PriceFormat"
import Image from "next/image"
import AddCart from "./AddCart"
import { SearchParamTypes } from "@/types/SearchParamTypes";

export default function Product({ searchParams, params}: SearchParamTypes) {
    console.log('serchParams in product page', searchParams, params.id);
    
    return (
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={800}
                height={800}
                priority={true}
                className="rounded-lg max-h-[30rem] max-w-[30rem] object-cover"
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
                <AddCart searchParams={searchParams} pid={params.id}/>
            </div>
        </div>
    )
}
