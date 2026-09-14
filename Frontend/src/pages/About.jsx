import React from 'react'
import { Title,NewsLatterBox } from '../components'
import { assets } from '../assets/frontend_assets/assets'
function About() {
  return (
    <div className='mb-20'>
      <div className="  text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a laboriosam itaque dolores eos numquam! Dolore, saepe vero sunt ex quod dolorum velit! Voluptates necessitatibus eum, aliquam libero in placeat!</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et at placeat accusantium cum voluptatibus consectetur. Atque praesentium sint eos veniam voluptas hic odit. Vitae enim, sapiente vel eum quisquam aspernatur.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, deserunt dolores. Natus, in aut ipsam nisi doloremque excepturi non dolorum esse, sapiente eligendi odio nam quis, possimus distinctio alias illum.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'}  text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className=" border  px-10 md:px-16  py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam natus vitae debitis minus error. Deserunt voluptatem explicabo fugit dolor aperiam accusantium dolorem commodi ut in iste, rerum quasi iure laborum!</p>
        </div>
        <div className="border  px-10 md:px-16  py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam natus vitae debitis minus error. Deserunt voluptatem explicabo fugit dolor aperiam accusantium dolorem commodi ut in iste, rerum quasi iure laborum!</p>
        </div>
        <div className="border  px-10 md:px-16  py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam natus vitae debitis minus error. Deserunt voluptatem explicabo fugit dolor aperiam accusantium dolorem commodi ut in iste, rerum quasi iure laborum!</p>
        </div>
      </div>
      <NewsLatterBox/>
    </div>
  )
}

export default About
