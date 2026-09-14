import React from 'react'

const NewsLatterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    }
  return (
    <div className='text-center pt-10'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off on  your first purchase!</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et saepe, iusto quidem dolores qui animi cumque illo! Unde, quibusdam fugit. Tempora quia dolore quam odit quos qui, est ipsum eos!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3  mx-auto my-6 border border-gray-300 pl-3' >
        <input className='w-full sm:flex-1 outline-none text-sm sm:text-xl truncate ' type="email"  placeholder='Enter your email ' required/>
        <button type='submit' className='bg-black text-white active:bg-gray-700 text-sm   sm:text-xl    px-10 py-4 font-normal'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLatterBox
