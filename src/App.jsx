
import { Fragment, useEffect } from 'react'
import './App.css'
import Login from './components/login'
import axios from 'axios'

function App() {
//tokenlerimizi yoxlayiriq 
const chechAuth =async()=>{

try {
  await axios.get(`${import.meta.env.VITE_APP_BASE_API_URL}authUser`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
} catch (e) {
if(e.response.status===401){
  localStorage.removeItem("token")
  // login sehifesine yonlendir 
  // navigate('/login')
}
}


}
useEffect(()=>{
  chechAuth()
},[])



  return (
    <Fragment>
 {/* <ToastContainer /> */}
      <Login/>
    </Fragment>
     
   
  )
}

export default App
