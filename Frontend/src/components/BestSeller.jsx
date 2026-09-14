 // from all products here we want to select those whose bestseller property is true in our assets data 


import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'

const BestSeller = () => {

    const {products} = useContext(ShopContext)
    const [bestSeller,setBestseller] = useState([])

    // console.log(products);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller === true))
        setBestseller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-10 '>
      <div className='text-center pt-20 text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, necessitatibus dolorem? Quisquam velit reprehenderit inventore beatae temporibus libero obcaecati, dolore impedit voluptatum autem accusantium iusto numquam aut consectetur alias architecto!
        </p>
      </div>
      {/* Here we have to mount that bestseller component */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
            bestSeller.map((item,index) => (
                <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
