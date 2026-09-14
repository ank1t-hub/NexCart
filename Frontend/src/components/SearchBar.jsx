import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext.jsx"
import { assets } from '../assets/frontend_assets/assets.js'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext)
    const location = useLocation();
    const [visible,setVisible]=useState(false) //this state is used by working on useLocation hook in below useeffect

    useEffect(() => {
        // console.log(location.pathname);
        // if (location.pathname.includes('collection') && showSearch){
        if (location.pathname.includes('collection') ){
            setVisible(true);
        }
        else{
            setVisible(false)
        }

    },[location,showSearch])

//   return showSearch ?  (
  return showSearch && visible ?  (
    <div className='border-t border-b mb-4 border-gray-50 rounded-full bg-gray-100 text-center '>
      <div className='inline-flex items-center justify-center  border border-gray-400 px-10 py-2 mt-4  my-3 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm sm:text-lg' type="text"  placeholder='Search'/>
        <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ): null
}

export default SearchBar
