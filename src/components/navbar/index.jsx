
import { NavLink,} from "react-router-dom";
// import instance from "../../api";

const CustomNavbar=()=>{
  // const isAuthenticated = window.location.pathname.includes("/profile");


  const getClassName = ({ isActive }) => {
    return `${isActive ? "active-link" : ""} nav-link`;
  };

const links=[
    {
        path:"/users", 
        text: 'Users'
    },
    {
        path:"/categories", 
        text: 'Categories'
    },
    {
        path:"/tags", 
        text: 'Tags'
    },
    {
      path:"/login", 
      text: 'Login'
  },
    // ...(isAuthenticated ? [{ path: "/profile", text: "Profile" }] : []),

]


// tokenlerimizi yoxlayiriq 
// const chechAuth =async()=>{

// try {
//   await axios.get(`${import.meta.env.VITE_APP_BASE_API_URL}authUser`,{
//     headers:{
//       Authorization:`Bearer ${localStorage.getItem("token")}`
//     }
//   })
// } catch (e) {
//     console.log(e);
    
// }


// }
// useEffect(()=>{
//   chechAuth()
// },[])


    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink className={getClassName} to={link.path}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
}

export default CustomNavbar