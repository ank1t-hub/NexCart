// In this file we list 10 products which are extracted from products and  mapped in LatestCollection file 
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItems = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext)
  return (
    <Link className='text-gray-700 cursor-pointer pt-10' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1  text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItems
