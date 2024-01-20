export default function Loading() {
    return (
        <ul className='grid grid-cols-fluid gap-16'>
            {[...Array(6)].map((_, index) => (
                <li key={index} className='relative animate-pulse'>
                    <div className='aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-300'></div>
                    <p className='mt-2 h-4 w-1/2 rounded-lg bg-gray-300'></p>
                    <p className='mt-2 block h-4 rounded-lg bg-gray-300 text-sm font-medium'></p>
                    <p className='mt-2 block h-4 rounded-lg bg-gray-300 text-sm font-medium'></p>
                </li>
            ))}
        </ul>
    )
}
