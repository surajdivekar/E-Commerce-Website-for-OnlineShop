import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
// import { Col, Row } from "react-bootstrap";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const LoginBtn = async (e) => {
    e.preventDefault(); // to prevent to refresh page on submit
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="login">
        <Container className="cardcontainer">
          <Card className="card">
            <Grid align="center">
              <CardContent>
                <div>
                  <h3>SignIn</h3>
                  <h5 style={{ marginBottom: "10px" }}>
                    Sign into your account
                  </h5>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      type="email"
                      placeholder="Enter Email "
                      size="small"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                      placeholder="Enter Password "
                      size="small"
                      required
                    />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button variant="outlined" onClick={LoginBtn}>
                      Login
                    </Button>
                  </div>
                  Don't have an account? <a href="signup">Sign up</a>
                </div>
              </CardContent>
            </Grid>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
