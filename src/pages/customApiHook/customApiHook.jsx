import { useEffect, useState } from "react"
import axios from "../../api/index.js"






const useApi =({path,params})=>{

const [data, setData]=useState([])
const [isLoading, setIsLoading]=useState(false)
const [total, setTotal]=useState(0)

const getData = async (showLoader=true)=>{
   setIsLoading(showLoader)
    const data =await axios.get(path,{params})
    setData(data.data)
    setIsLoading(false)
    setTotal(data.meta.total)
}

useEffect(()=>{
    getData()
},[])


return {data, isLoading, getData, total}



}
export default useApi