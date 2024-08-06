import axios from '../../api/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import dayjs from "dayjs"





const Categories = () => {
  const [data,setData]=useState([]);
 const [isFetching, setIsFetching]=useState(false)

  const getData =async(showLoader=true)=>{
    setIsFetching(showLoader)
    const data= await axios.get('dashboard/categories/index')
    setData(data?.categories)
    setIsFetching(false)
  }
 
  const deleteCategory =async (id)=>{
   await axios.delete(`dashboard/categories/${id}`)
   getData()
  }

  useEffect(()=>{
    getData()
  },[])


  return (
 isFetching? <CustomSpinnner/>:<Container fluid className='mt-5' >
    <h3>Categories({data.length})</h3>
    <Row className='gap-4'>
      <Col sm={12} md={3}>
      <Button color='success'><FaPlus className='d-flex'/></Button>
      </Col>
      <Col sm={12}>
      <Table hover responsive bordered>
        <thead>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Type</th>
            <th>Created at</th>
            <th>Img</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index)=>{
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.type ===1 ? 'Main':'ChatGpt'}</td>
              <td>
                {item.image && <img src={item.image} width="50px" height="50px"/>}
              </td>
              <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
              <td>
                <Button color='danger' className='d-flex' onClick={()=>deleteCategory(item.id)}>
                  <FaTrash/>
                </Button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      </Col>
    </Row>
   </Container>
  )
};
export default Categories;
