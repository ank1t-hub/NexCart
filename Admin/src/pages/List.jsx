// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { backendUrl } from '../App'
// import axios from 'axios'
// import {toast} from "react-toastify"
// import { currency } from '../App'



// const List = ({token}) => {
//   const [list,setList] = useState([])

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl+'/api/product/list')
//       // console.log(response.data);
//       if (response.data.success) {
//         setList(response.data.products)
//       }
//       else{
//         toast.error(response.data.message)
//       }


//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   },[])


//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token:token}})
//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList()
//       }
//       else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
      
//     }
//   }//this is function for remove product  in list using that cross icon

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className=' flex flex-col gap-2  '>
//         {/* List Table Title */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* Product List */}
//         {
//           list.map((item,index) => (
//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//               <img className='w-12' src={item.image[0]} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p >{currency}{item.price}</p>
//               <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//             </div>
//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default List








import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import {toast} from "react-toastify"
import { currency } from '../App'



const List = ({token}) => {

  const [isLoading,setIsLoading] = useState(false)  // State for initial data fetching spinner
  const [deletingId,setDeletingId] = useState(null)  // State tracking the ID of the product currently being deleted


  const [list,setList] = useState([])

  const fetchList = async () => {
    setIsLoading(true) // Start layout loader
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      console.log("API RESPONSE:", response.data);
      if (response.data.success) {
        console.log("SETTING PRODUCTS:", response.data.products);
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
        setList([]);
      }


    } catch (error) {
      console.log("ERROR",error);
      toast.error(error.message)
    }
    finally{
      setIsLoading(false) // Stop layout loader
    }
  }

  useEffect(() => {
    fetchList()
  },[])


  const removeProduct = async (id) => {
    if (deletingId) return;     // Prevent double clicking if another delete is already processing
    setDeletingId(id) // Track which product is currently deleting

    try {
      const response = await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token:token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    finally {
      setDeletingId(null) // Reset tracker once done
    }
  }//this is function for remove product  in list using that cross icon





  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className=' flex flex-col gap-2  '>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List conditionaly rendered (this is the main change) */}
        { isLoading ?
        (
          /* 1. Global Fetching State: Shows Tailwind Skeletons while loading list */
          Array(4).fill(0).map((_, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border animate-pulse'>
              <div className='w-12 h-12 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded w-1/3'></div>
              <div className='h-4 bg-gray-200 rounded w-6 mx-auto'></div>
            </div>
          ))
        ) : list.length === 0 ?
        (
          <p className="text-gray-500 text-center py-4">No products found.</p>
        ) :
          list.map((item,index) => (
            <div className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ${deletingId === item._id ? 'opacity-50' : ''}`} key={item._id}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p >{currency}{item.price}</p>
              {/* 2. Item Specific Deleting Loader */}
              <div className='flex justify-end md:justify-center items-center'>
                {deletingId === item._id ? 
                (
                  // Tailwind CSS Spinner
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : 
                <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700 font-bold ' title='Remove product'>X</p>
              }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
