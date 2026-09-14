import React from 'react'
import {Navbar,Sidebar,Login} from "./components"
import {Routes,Route} from "react-router-dom"
import {Add,List,Orders} from "./pages"
import { useState } from 'react'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react'

export const backendUrl = import.meta.env.VITE_BACKEND_URL //here we store our backend address
export const currency = '$'

const App = () => {
  // const [token,setToken] = useState("")
  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :'') //this change is doned ater creating below useEffect

  useEffect(() => {
    localStorage.setItem('token',token)
  },[token])//when we refresh the page we logged out automatically for solving this problem we are using local storage

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/> :
      <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                  <Route path='/add' element={<Add token={token}/>}/>
                  <Route path='/list' element={<List token={token}/>}/>
                  <Route path='/orders' element={<Orders token={token}/>}/>
              </Routes>
          </div>
        </div>
      </>      
      }

    </div>
  )
}

export default App
