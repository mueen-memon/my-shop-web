type Params = {
    id: string,
}

type SearchParams = {
    id: string,
    name: string,
    image: string,
    unit_amount: number | null,
    description: string | null,
    features: string
}

export type SearchParamTypes = {
    params: Params,
    searchParams: SearchParams
}
