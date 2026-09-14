import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems'

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [lattestProducts,setLattestProducts] = useState([])

    useEffect(() =>{//extracting 10 elements from products and store these to lattestProducts state variable
      setLattestProducts(products.slice(0,10));
    },[products]); //here i a giving dependencies as empty array only so the useffect once run when component loaded 




    // console.log(products);
    
  return (
    <div className='my-10'>
      <div className='text-center pt-20  py-8 text-3xl'>
        <Title text1={'LATTEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi voluptatum iste ratione veniam accusamus error cupiditate natus explicabo in, impedit distinctio nam neque maxime inventore sequi, consequatur exercitationem eveniet ab!
        </p>
        {/* Rendering products by maping from products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {lattestProducts.map((item,index) => (
              <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestCollection
