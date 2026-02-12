import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { dummyProducts } from '../assets/assets'

const AllProducts = () => {

  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    const allProducts = [...products, ...dummyProducts];
    if (searchQuery.length > 0) {
      setFilterProducts(allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
    } else {
      setFilterProducts(allProducts);
    }
  }, [products, searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
      <div className='felx flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      <div className='grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 '>
        {filteredProducts.filter((product) => product.inStock).map((product, index) => (<ProductCard key={index} product={product} />))}
      </div>
    </div>
  )
}

export default AllProducts;