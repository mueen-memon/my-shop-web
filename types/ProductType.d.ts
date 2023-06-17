type ProductType = {
    id: string
    name: string,
    description: string,
    image: string,
    unit_amount: number | null,
    quantity?: number | 1,
    metadata: MetaDataType 
}

type MetaDataType = {
    features: string
}