





import { Navigate } from "react-router-dom";

const Layout = ({ children, path }) => {
  if (!localStorage.getItem("token") && path !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{width: '100%',height: '100vh' }}>
      {children}
    </div>
  );
};

export default Layout;