

import './App.css'
// import Login from './components/login'
// import axios from 'axios'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import CustomNavbar from './components/navbar'
import Users from './pages/Users'
import Categories from './pages/Categories'
import Tags from './pages/Tags'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './conponents/leyout'
import Login from './pages/login'

function App() {
 const routes=[
  {
    path:"/users", 
   element:<Users/>
},
{
    path:"/categories", 
    element: <Categories/>
},
{
    path:"/tags", 
    element: <Tags/>
},
{
  path:"/login", 
  element: <Login/>
},
 ]

  return (

    <BrowserRouter>
    <ToastContainer/>
    <CustomNavbar />
    <Routes>
      {routes.map(({path,element})=>(
        <Route key={path} path={path}
        element={path.includes('login')?element:<Layout path={path}>{element}</Layout>}
        ></Route>
      ))}
     
    </Routes>
  </BrowserRouter>
  )
}

export default App
