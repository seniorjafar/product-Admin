import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Container } from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [loading, setLoading] = useState(false)

  const handleLogin = e => {
    e.preventDefault()
    let user = {username, password}
    setLoading(true)

    axios 
      .post('https://dummyjson.com/auth/login', user) 
      .then(res => {
        console.log(res.data)
        // toast.success("welcome")
        localStorage.setItem("x-auth-token", res.data.token)
        navigate("/admin/create")
      })
      .catch(err => {
        console.log(err);
        toast.error("username or password is incorrect")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div  className="login">
      <Container>
        <h2 className="text-center text-success">Login</h2>

        <form onSubmit={handleLogin} action="">
          <InputGroup className="mb-3">
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              name=""
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="password"
              name=""
            />
          </InputGroup>
          
          <button type="success" className="btn" disabled={loading}>{loading ? "Loading..." : "Log in"}</button>
        </form>
        <div className="d-flex gap-3 mt-2">
          <Button variant="info" onClick={() => navigate("/")}>Go Home</Button>
        <Button variant="info" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Container>
    </div>
  );
};

export default memo(Login);
