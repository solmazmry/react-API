import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';



const Tags = () => {

  const isOpen=useSelector((state)=> state.home.isOpen)
  return <div><h1 className="text-danger">Tags page {isOpen.toString()}</h1></div>;
};
export default Tags;