import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'
import {About,Cart,Collection,Contact,Home,Login,Orders,PlaceOrder,Product} from "./pages"
import {Navbar,Footer,SearchBar} from './components'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
        </Routes>
        {/* <Footer/> */}
      </div>
      <Footer/>
    </>
  )
}

export default App
