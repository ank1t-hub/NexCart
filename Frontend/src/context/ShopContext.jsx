import { createContext, useEffect, useState } from "react"
// import { products } from "../assets/frontend_assets/assets"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext()


const ShopContextProvider = (props) => {
    
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems] =useState({})
    const navigate = useNavigate() // new hook
    const [products,setProducts]=useState([]) //this state is created for backend products
    const [token,setToken] = useState('')

    const addToCart = async (itemId,size) => {

        if(!size) {
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartItems)// here structuredClone  create the copy of cartItems object

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId] [size]+= 1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount =() => {
        let totalCount  = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    throw error
                }
            }
        }
        return totalCount
    }

    // useEffect(() => {  //this is useeffect and console.log for consoling addToCart
    //     console.log(cartItems);  
    // },[cartItems])

    const updateQuantity= async  (itemId,size,quantity) => { //this function for deleting items from cart 
        let cartData = structuredClone(cartItems)
        cartData[itemId][size]=quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
               console.log(error);
               toast.error(error.message)
            }
        }
    }
    
    // const getCartAmount =  () => { //this is for toalcart.jsx file to show total cart price 
    //     let totalAmount = 0;
    //     for (const items in cartItems){
    //         let itemInfo = products.find((product) => product._id === items)
    //         for (const item in cartItems[items]){
    //             try {
    //                 if (cartItems[items][item] >0){
    //                     totalAmount += itemInfo.price * cartItems[items][item]
    //                 }
    //             } catch (error) {
    //                 throw error
    //             }
    //         }
    //     }
    //     return totalAmount
    // }
    // //or
    const getCartAmount = () => { 
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        // Safeguard: Ensure itemInfo exists before reading price
                        if (itemInfo) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    }
                } catch (error) {
                    throw error;
                }
            }
        }
        return totalAmount;
    } 

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductData()
    },[])//useeffect for calling getProductData

    useEffect(() =>{  // when we navigates from login page to home after submiting from that place we can move back to login page because the token stored in previes created useeffect in Login.jsx to solve this we have this useeffect
        if (!token  && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])



    const value = {
        products: products,
        currency: currency,
        delivery_fee: delivery_fee,
        search:search,
        setSearch:setSearch,
        showSearch:showSearch,
        setShowSearch:setShowSearch,
        cartItems:cartItems,
        setCartItems:setCartItems,
        addToCart:addToCart,
        getCartCount:getCartCount,
        updateQuantity:updateQuantity,
        getCartAmount:getCartAmount,
        navigate:navigate,
        backendUrl:backendUrl,
        token:token,
        setToken:setToken,
    }
    return (
        <ShopContext.Provider value={value}> 
          {props.children} 
        </ShopContext.Provider>
    )
}


export default ShopContextProvider






