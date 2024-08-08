// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "../../api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  Row,
  Spinner,
} from "reactstrap";
// import {useNavigate} from 'react-router-dom'
function Login() {
  const { control, handleSubmit } = useForm();
  //button login edirik ApI istek atarken
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (values) => {
    setIsLoading(true);
    try {
      const data = await axios.post("login", values);
      localStorage.setItem("token", data.data.token);
      toast.success(data.message);
      // proses dayananda false edirik
      // home sehifesine yonlendirir
      navigate("/categories");
    } catch (e) {
      console.error(e.response);
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={4}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(login)}>
                <Controller
                  rules={{ required: true }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        value={value}
                        onChange={onChange}
                        invalid={error}
                      />
                    </div>
                  )}
                  name="email"
                  control={control}
                />

                <Controller
                  rules={{ required: true }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        name="password"
                        id="password"
                        type="password"
                        value={value}
                        onChange={onChange}
                        invalid={error}
                      />
                    </div>
                  )}
                  name="password"
                  control={control}
                />
                <Button
                  disabled={isLoading}
                  color="success"
                  type="submit"
                  className="mt-2 w-100"
                >
                  {isLoading ? <Spinner color="light" size="sm" /> : "Login"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
