import React, { useContext, useState } from 'react'
import { CartTotal, Title } from '../components'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import {toast} from 'react-toastify'


function PlaceOrder() {
  const [method,setMethod] = useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee, products } = useContext(ShopContext)

  const [formData ,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data =>  ({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
        let orderItems = []
        for(const items in cartItems) {
            for(const item  in cartItems[items]){
                if (cartItems[items][item] > 0) {
                    const itemInfo =  structuredClone(products.find(product =>  product._id === items))
                    if (itemInfo){
                        itemInfo.size = item
                        itemInfo.quantity =  cartItems[items][item]
                        orderItems.push(itemInfo)
                    }
                }
            }
        }
        // console.log(orderItems);
        let orderData ={ 
            address:formData,
            items:orderItems,
            amount:getCartAmount() + delivery_fee
        }

        switch(method){
            //Api calls for Cod Order
            case 'cod':
                const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                if (response.data.success) {
                    setCartItems({}) //here we in frontend we also clearing cartData after  Placing order
                    navigate('/orders')
                }
                else{
                    toast.error(response.data.message)
                }
                break
            default:
                break
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }                 

  return (
    <form onSubmit={onSubmitHandler} className='mb-40 flex flex-col sm:flex-row justify-between  gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* LEFT SIDE  */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>
        <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
            <input required onChange={onChangehandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='First name' type="text" />
            <input required onChange={onChangehandler} name='lastName' value={formData.lastName}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Last name' type="text" />
        </div>
        <input required onChange={onChangehandler} name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Email Address' type="email" />
        <input required onChange={onChangehandler} name='street' value={formData.street}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Street' type="text" />
        <div className='flex gap-3'>
            <input required onChange={onChangehandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='City' type="text" />
            <input required onChange={onChangehandler} name='state' value={formData.state}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='State' type="text" />
        </div>
        <div className='flex gap-3'>
            <input required onChange={onChangehandler} name='zipcode' value={formData.zipcode}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Zipcode' type="number" />
            <input required onChange={onChangehandler} name='country' value={formData.country}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Country' type="text" />
        </div>
        <input required onChange={onChangehandler} name='phone' value={formData.phone}  className='border border-gray-300 rounded py-1.5  px-3.5 w-full' placeholder='Phone' type="number" />
      </div>
      {/* RIGHT SIDE */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
            <CartTotal/>
        </div>
        <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* PAYMENT METHOD SELECTION */}
            <div className='flex gap-3 flex-col  '>
                {/* <div className='flex items-center gap-3 border-gray-50 border bg-gray-200 p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5  border rounded-full`}></p>
                    <img className=' h-5 mx-4 overflow-auto' src={assets.PhonePe_Logo} alt="" />
                </div> */}
                <div onClick={() => setMethod('PhonePay')} className='flex items-center gap-3 border-gray-50 border bg-gray-200 px-3 cursor-pointer h-[38px]'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'PhonePay' ? 'bg-green-400 ': '' } `}></p>
                    <img className='h-8.5 mx-1 object-contain' src={assets.PhonePe_Logo} alt="PhonePe" />
                </div>
                <div onClick={() => setMethod('Rozorpay')} className='flex items-center gap-3 border-gray-50 border bg-gray-200 p-2  px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'Rozorpay' ? 'bg-green-400  ' : ''} `}></p>
                    <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                </div>
                <div onClick={() => setMethod('Google_pay')} className='flex items-center gap-3 border-gray-50 border bg-gray-200 p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'Google_pay' ? 'bg-green-400  ': ''}`}></p>
                    <img className='h-5 mx-4' src={assets.GooglePay_Logo} alt="" />
                </div>
                <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border-gray-50 border bg-gray-200 p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'cod' ? 'bg-green-400  ' :''}`}></p>
                    <p className='text-gray-500 text-sm font-mediummx-4'>CASH ON DELIVERY</p>
                </div>
            </div>
            <div className='w-full text-end mt-8' >
                  <button type='submit'  className='bg-black text-white px-16 py-3  text-sm active:bg-gray-700'>PLACE ORDER</button>
            </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
