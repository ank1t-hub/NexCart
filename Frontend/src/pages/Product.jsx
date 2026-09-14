//here we display those products whose link and route provided in productitems.jsx means when we click any page in home page or collection then that product opens here 
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { RelatedProducts } from '../components';

function Product() {

  const {productId} = useParams() //new hook use to get the id from url (we using productId keyword becuse we wrriten it in app.jsx during /products route)
  // console.log(productId);
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId){
        setProductData(item)
        // console.log(item);     
        setImage(item.image[0])  
        return null ;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  },[productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 mb-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product images  */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] '>
            {
              productData.image.map((item,index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full  sm:mb-3 shrink-0 cursor-pointer object-cover'  alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[81.3%]'>
              <img className='w-full h-auto object-cover' src={image} alt="" />
          </div>
        </div>
         {/* product info */}
        <div className='flex-1'>
            <h1 className='font-medium  text-2xl  mt-2 '>{productData.name}</h1>
            <div className='flex items-center gap-1  mt-2'> 
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2 '>
                  {productData.sizes.map((item,index) => (
                    <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-200 ${item === size ? 'border-orange-500 border-2': ''}`} key={index}> {item}</button>
                  ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm  text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>100% Original products</p>
                  <p>Cash on delivery available on this project </p>
                  <p>Easy return and exchange policy</p>
            </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className='mt-20'>
        <div className="flex gap-5">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col mt-5 gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.</p>
          <p>E-commerce websites typically display products or services along with detailed information such as product names, descriptions, prices, images, available sizes or variations, and customer reviews. Users can browse products, search and filter items, add products to their shopping cart, and complete purchases through an online checkout process. </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ): <div className='opacity-0'></div>
}

export default Product














// // here we display those products whose link and route provided in productitems.jsx
// // means when we click any product on home page or collection then that product opens here

// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';

// function Product() {

//   const { productId } = useParams()
//   // console.log(productId);

//   const { products } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false)
//   const [image, setImage] = useState('')

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item)
//         // console.log(item);
//         setImage(item.image[0])
//         return null;
//       }
//     })
//   }

//   useEffect(() => {
//     fetchProductData()
//   }, [productId])

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

//       {/* Product Data */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

//         {/* ------------------------------------------------
//         OLD PRODUCT IMAGES + PRODUCT INFO CODE

//         This entire block is commented out because the
//         new product image section is being used below.

//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal'>
//             {
//               productData.image.map((item, index) => (
//                 <img
//                   onClick={() => setImage(item)}
//                   src={item}
//                   key={index}
//                   className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
//                   alt=""
//                 />
//               ))
//             }
//           </div>

//           <div className='w-full sm:w-[80%]'>
//             <img
//               className='w-full h-auto'
//               src={image}
//               alt=""
//             />
//           </div>

//           <div className='flex-1'>
//             <h1 className='font-medium text-2xl mt-2'>
//               {productData.name}
//             </h1>
//           </div>

//         </div>

//         ------------------------------------------------ */}

//         {/* Product images */}
//         <div className='flex w-full sm:w-[60%] flex-col-reverse gap-3 sm:flex-row'>

//           {/* Thumbnail images */}
//           <div className='flex sm:w-[20%] sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2'>
//             {
//               productData.image.map((item, index) => (
//                 <img
//                   onClick={() => setImage(item)}
//                   src={item}
//                   key={index}
//                   className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
//                   alt=""
//                 />
//               ))
//             }
//           </div>

//           {/* Main image */}
//           <div className='w-full sm:w-[75%]'>
//             <img
//               className='w-full h-auto'
//               src={image}
//               alt=""
//             />
//           </div>
//         </div>
//         {/* product info */}
//         <div className='flex-1'>
//             <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
//         </div>

//       </div>
//     </div>

//   ) : (
//     <div className='opacity-0'></div>
//   )
// }

// export default Product







