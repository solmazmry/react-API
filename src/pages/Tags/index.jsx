import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import dayjs from "dayjs";

import { Controller, useForm } from "react-hook-form";
import { types } from "../../data.js";
import axios from "../../api/index.js";
import useApi from "../customApiHook/customApiHook.jsx";
import CustomSpinner from "../../components/spinner/CustomSpinner.jsx";

const Tags = () => {
  // const [filter, setFilter] = useState("");

  const [modal, setModal] = useState(false);
  const [limit, setlimit]=useState(10)
  const[page, setPage]=useState(1)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      type: 1,
    },
  });
  //filter Value
  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };

  // const handleFilterChange = data.filter((data)=>
  //   data.name.toLowerCase().includes(filter.toLowerCase())
  //   )


 

  const deleteCategory = async (id) => {
    await axios.delete(`dashboard/categories/delete/${id}`);
   getData(false)
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  const addCategory = async (values) => {
    await axios.post("dashboard/categories/store", values);
    reset({
      name: "",
      type: null,
      image: "",
    });
    toggleModal();
   getData(false)
  };





const getPagination =()=>{

  const count =Math.ceil((total/(limit||1)))
  console.log(count);
  
  return    <Pagination
  aria-label="Page navigation example">
<PaginationItem onClick={()=>{
  if(page!==1){
    setPage(prev=>prev-1)
  }
 
}} disabled={page===1}>
 <PaginationLink previous  />
</PaginationItem>

{Array.from({length:count}).map((_,index)=>(
  <PaginationItem active={page===index+1} key={index}>
  <PaginationLink onClick={()=>setPage(index+1)} href="#">
    {index+1}
  </PaginationLink>
 </PaginationItem>
))}
<PaginationItem  onClick={()=>{
  if(page!==count){
    setPage(prev=>prev+1)
  }
}} disabled={count===page}>
 <PaginationLink next  />
</PaginationItem>
</Pagination>

}


useEffect(()=>{
getData()
},[page, limit])





const {data, isLoading,getData, total }=useApi({
  path:"dashboard/categories/index",
  params:{
    page,
    limit
  }

})



  return isLoading ? (
    <CustomSpinner />
  ) : (
    <Container fluid className="mt-5">
      <h3 className="my-3">Tags ({total})</h3>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardBody>
              <form>
              
                  <Label htmlFor="filter">Name</Label>
                  <Controller
                    render={({ field }) => (
                      <Input
                      className="form-control"
                        id="filter"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                     
                        }}
                      />
                    )}
                    name="filter"
                    control={control}
                  />
               
               
              <Label htmlFor="type">Type</Label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <select
                   className="form-control"
                    name="type"
                    id="type"
                    value={value}
                    onChange={onChange}
                  >
                    {types.map((item, index) => (
                      <option key={index} value={item.id}>{item.name} </option>
                    ))}
                  </select>
                )}
                name="type"
                control={control}
              />
          
                <div className="justify-content-end d-flex">
                  <Button
                    color="primary"
                    type="submit"
                    className="mt-3  "
                    onClick={() => getData()}
                  >
                    add
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tags</ModalHeader>
        <ModalBody>
          <form id="add-category" onSubmit={handleSubmit(addCategory)}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <Input id="name" value={value} onChange={onChange} />
                )}
                name="name"
                control={control}
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <Input id="image" value={value} onChange={onChange} />
                )}
                name="image"
                control={control}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <select
                    className="form-control"
                    name="type"
                    id="type"
                    value={value}
                    onChange={onChange}
                  >
                    {types.map((item ,index) => (
                      <option key={index} value={item.id}>{item.name} </option>
                    ))}
                  </select>
                )}
                name="type"
                control={control}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="button" outline>
            Close
          </Button>
          <Button color="primary" type="submit" form="add-category">
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Row className="gap-4">
        <Col className="mt-3" sm={12} md={3}>
          <Button color="success" onClick={toggleModal}>
            <FaPlus className="d-flex" />
          </Button>
        </Col>
        <Col sm={12}>
          <Table hover responsive bordered>
            <thead>
              <tr>
                <th>NO</th>
                <th>Name</th>
                <th>Type</th>
                <th>Image</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.categories?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type === 1 ? "Main" : "ChatGpt"}</td>
                  <td>
                    {item.image && (
                      <img src={item.image} alt="" width="50px" height="50px" />
                    )}
                  </td>
                  <td>{dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => deleteCategory(item.id)}
                    >
                      <FaTrash className="d-flex" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


       {getPagination()}
       <Input value={limit} onChange={e=>setlimit(e.target.value)}/>
        </Col>
      </Row>
    </Container>
  );
};
export default Tags;
