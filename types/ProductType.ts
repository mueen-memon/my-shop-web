export type ProductType = {
    id: string
    name: string,
    description: string | null,
    image: string,
    unit_amount: number | null,
    quantity?: number | 1,
    metadata: MetaDataType 
}

type MetaDataType = {
    features: string
}