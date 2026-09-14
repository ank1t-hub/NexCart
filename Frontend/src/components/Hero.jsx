import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base bg-indigo-400 text-gray-200 rounded-2xl border-0 px-2 py-1 hover:bg-indigo-500 hover:text-black '>SHOP NOW </p>
            <p className='w-8 md:w-11 h-px bg-[#414141]'></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero



// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'

// const Hero = () => {
//   return (
//     // Added a custom height constraint (e.g., h-[300px] on small, h-[450px] on desktop)
//     <div className='flex flex-col sm:flex-row border border-gray-400 h-auto sm:h-[400px] md:h-[450px] lg:h-[500px]'>
      
//       {/* Hero Left Side */}
//       {/* Reduced padding from py-10 to py-8 for small screens */}
//       <div className='w-full sm:w-1/2 flex items-center justify-center py-8 sm:py-0'>
//         <div className='text-[#414141]'>
          
//           {/* OUR BESTSELLERS */}
//           <div className='flex items-center gap-2'>
//             <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
//             <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
//           </div>
          
//           {/* Headline - Changed "Lattest" typo to "Latest" and switched leading-relaxed to leading-tight to save vertical space */}
//           <h1 className='text-3xl sm:py-2 lg:text-5xl leading-tight font-serif my-1'>
//             Latest Arrivals
//           </h1>
          
//           {/* SHOP NOW */}
//           <div className='flex items-center gap-2'>
//             <p className='font-semibold text-sm md:text-base cursor-pointer'>SHOP NOW </p>
//             <p className='w-8 md:w-11 h-px bg-[#414141]'></p>
//           </div>
          
//         </div>
//       </div>
      
//       {/* Hero Right Side */}
//       {/* Added h-full and object-cover so the image shrinks cleanly into the new shorter box dimensions */}
//       <img className='w-full sm:w-1/2 h-75 sm:h-full object-cover' src={assets.hero_img} alt="Hero" />
      
//     </div>
//   )
// }

// export default Hero
