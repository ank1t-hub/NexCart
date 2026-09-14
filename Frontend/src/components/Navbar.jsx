import React, { useContext } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import {NavLink,Link} from 'react-router-dom'
import { ShopContext} from '../context/ShopContext'

function Navbar() {
    const [visible, setVisible] = React.useState(false)


    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)

    const logout =() => {  //logout function in login .jsx
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 h-5 cursor-pointer sm:hidden '/>
      <Link to='/'><img src={assets.logo} alt="logo" className='w-36 hidden min-[350px]:block' /></Link>
      <ul className='hidden sm:flex gap-[2vw] font-medium text-sm text-gray-700'>
            <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4  border-none h-[1.5px] bg-gray-700  hidden'/>
            </NavLink>
            <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/About' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/Contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
      </ul>
      <div className='flex items-center gap-6 '>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 h-5 cursor-pointer'/>
        <div className='group relative'>
            <img onClick={() => token ? null : navigate('/login')}  src={assets.profile_icon} alt="profile" className='w-5 h-5 cursor-pointer'/>
            {/* dropdown menu  */}
            { token &&             
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                    {/* <NavLink to='/login' className='hover:text-gray-900'>Login</NavLink> */}
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
            </div>}
        </div>
        <NavLink to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="cart" className='w-5 h-5 min-w-5 cursor-pointer'/>
          {/* <p className='absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>0</p> */}
          <p className='absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
        </NavLink>
      </div>
      {/* Sidebar menu for small screesns*/ }
      <div className={`absolute  sm:hidden overflow-hidden  bg-white transition-all top-0 left-0  z-50 ${visible ? 'w-full h-full' : 'w-0 h-0'}`} onClick={() => setVisible(false)}>
        <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border  hover:bg-gray-200 ' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border  hover:bg-gray-200 ' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border  hover:bg-gray-200 ' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border  hover:bg-gray-200 ' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar



