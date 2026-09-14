import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base  text-gray-700 '>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-sans'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange within 30 days of purchase.</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-sans'>Quality Assurance</p>
        <p className='text-gray-400'>All our products are guaranteed for quality and durability.</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-sans'>Best Customer Support</p>
        <p className='text-gray-400'>We provide quick and reliable 24/7 customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy



// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'

// const OurPolicy = () => {
//   return (
//     <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
//       <div>
//         <img
//           src={assets.exchange_icon}
//           className='w-12 m-auto mb-5'
//           alt=""
//         />
//         <p className='font-sans'>Easy Exchange Policy</p>
//         <p className='text-gray-400'>
//           We offer hassle-free exchange within 30 days of purchase.
//         </p>
//       </div>

//       <div>
//         <img
//           src={assets.quality_icon}
//           className='w-12 m-auto mb-5'
//           alt=""
//         />
//         <p className='font-sans'>Quality Assurance</p>
//         <p className='text-gray-400'>
//           All our products are guaranteed for quality and durability.
//         </p>
//       </div>

//       <div>
//         <img
//           src={assets.support_img}
//           className='w-12 m-auto mb-5'
//           alt=""
//         />
//         <p className='font-sans'>Best Customer Support</p>
//         <p className='text-gray-400'>
//           We provide quick and reliable 24/7 customer support.
//         </p>
//       </div>

//     </div>
//   )
// }

// export default OurPolicy