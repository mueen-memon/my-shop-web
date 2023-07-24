import getProducts from '@/util/getProducts'
import Product from './components/Product'

export default async function Home() {
  const products = await getProducts()
  
  return (
    <main className='grid grid-cols-fluid gap-16' >
      {products.map((product) => (
        <Product {...product} data-id={product.id} key={product.id}/>
      ))}
    </main>
  )
}
