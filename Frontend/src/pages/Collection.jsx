import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { Title,ProductItems } from '../components'


function Collection() {

  const {products,search ,showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter]=useState(false) //this is state for showing filter option like they are hiiden defult in mobile you have to access them button but they are not hiiden in desktop
  const [filterProducts,setFilterProducts]=useState([]) //this is main state to use in  for set setting filter on all products 
  const [category,setCategory]=useState([]) //state for category filter 
  const [subCategory,setSubCategory]=useState([])  //state for subcategory filter 
  const [sortType,setSortType] = useState('relavant')

  // toggle functions for filtering and adding to states like category and subCategory
  const togglCategory =(e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e) => {
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev=> [...prev,e.target.value])
    }

  }

  // const applyFilter = () => {   //this is function for applying filter instesd of consoling  those onUse
  //   let productsCopy=products.slice();


  //   if (category.length>0) {
  //     productsCopy=productsCopy.filter(item => category.includes(item.category))
  //   }

  //   if (subCategory.length>0){
  //     productsCopy=productsCopy.filter(item => subCategory.includes(item.subCategory))
  //   }

  //   setFilterProducts(productsCopy)
  // }

  const applyFilter = () => {   //this is function for applying filter instesd of consoling  those onUse
    let productsCopy=products.slice();

    if (showSearch && search){
      productsCopy=productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length>0) {
      productsCopy=productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length>0){
      productsCopy=productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  // useEffect(() => { //this is initially used but now i am using setFilterproducts inside applyfilter function
  //   setFilterProducts(products)
  // },[products])

  // //these two useEfffects for consoles testing
  // useEffect(() => {
  //   console.log(category);
    
  // },[category])
  // useEffect(() => {
  //   console.log(subCategory);
    
  // },[subCategory])

  useEffect(() => {  //this is useEffect for calling applyFilter
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price-b.price)))
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price-a.price)))
        break;
      
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mb-10 border-t  border-gray-400'>
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':'rotate-0'} `} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '':'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Men'} onChange={togglCategory}/>Men
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Women'} onChange={togglCategory}/>Women
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Kids'} onChange={togglCategory}/>kids
              </p>
            </div>
        </div>
        {/* subcategory filder */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
              <p className='flex gap-2 '>
                  <input className='w-3 ' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
              </p>
            </div>
        </div>        
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={"COLLECTIONS"}/>
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm sm:text-lg px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map options */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index) => (
              <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image}  />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
