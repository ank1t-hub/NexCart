import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-200 px-4 sm:px-10 md:px-20 border  border-gray-200 w-full  '>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-15 text-lg'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et saepe, iusto quidem dolores qui animi cumque illo! Unde, quibusdam fugit. Tempora quia dolore quam odit quos qui, est ipsum eos!
            </p>
        </div>
        <div>
           <p className='text-xl font-medium mb-5'>COMPANY</p> 
           <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
           </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>123 Main Street, City</li>
                <li>Email: info@example.com</li>
                <li>Phone: (123) 456-7890</li>
            </ul>
        </div>
        <div className='col-span-full'>
            <hr className='border-gray-400'/>
            <p className='py-5 text-sm sm:text-lg text-center'>Copyright 2024@ forever.com - All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
