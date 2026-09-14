import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from '../components'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Orders() {
  const {backendUrl,token,currency} = useContext(ShopContext)

  const [orderData,setOrderData] = useState([])
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      // console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        // console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
      loadOrderData() 
  },[token]) //whenever this token will updated this useEffect run this function

  return (
    <div className='mb-20 border-t pt-16'>
      <div className="text-2xl ">
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>
      <div>
        {
          // products.slice(1,4).map((item,index) => (
          orderData.map((item,index) => (
            <div className='py-4 border-t border-b text-gray-700  flex flex-col md:flex-row  md:items-center md:justify-between gap-4' key={index}>
                <div className="flex items-start gap-6 text-sm">
                  <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>{currency} {item.price}</p>
                      <p>Quantity : {item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    {/* <p>DATE: <span className='text-gray-400'> {item.date}</span></p> */}
                    <p className='mt-1'>DATE : <span className='text-gray-400'> {new Date(item.date).toDateString(FontFace)}</span></p>                   
                    <p className='mt-1'>PAYMENT : <span className='text-gray-400'> {item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                 <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                 </div>
                 <button onClick={loadOrderData} className='border px-4 py-2  text-sm font-medium rounded-sm active:bg-gray-700 active:text-white'>Track Order</button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
