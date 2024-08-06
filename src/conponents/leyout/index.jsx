import { Navigate } from "react-router-dom"

const Layout =({children,path})=>{
if(!localStorage.getItem('login')&& path!=='/login'){
    return <Navigate to="/login"/>
}


return <div style={{
    border: '3px solid black',
    width: 400,
    height:400
}}>
{children}
</div>
}
export default Layout