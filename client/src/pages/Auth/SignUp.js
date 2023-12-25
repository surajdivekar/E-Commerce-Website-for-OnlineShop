import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
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
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setCnfPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  //SignUp Function here.................
  const SignUp = async (e) => {
    e.preventDefault(); // to prevent to refresh page on submit

    if (password === confirmpassword) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/register`,
          { name, email, phone, password, address }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong..!");
      }
      // console.log(name, email, phone, password);
      // toast.success("registered successfully");
    } else {
      toast.error("Passwords do not match. Enter correct password.");
    }
  };

  return (
    <Layout>
      <div className="signup">
        <Container className="cardcontainer">
          <Card className="card">
            <Grid align="center">
              <CardContent>
                <div>
                  <h3>SignUp</h3>
                  <h5 style={{ marginBottom: "10px" }}>
                    Sign into your account
                  </h5>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      placeholder="Enter username "
                      size="small"
                      required
                    />
                  </div>
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
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      variant="outlined"
                      type="number"
                      placeholder="Enter phone number "
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
                  <div>
                    <TextField
                      label="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => setCnfPassword(e.target.value)}
                      variant="outlined"
                      placeholder="Re-Enter Password "
                      size="small"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      variant="outlined"
                      placeholder="Enter Address "
                      size="small"
                    />
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button variant="outlined" onClick={SignUp}>
                      Sign Up
                    </Button>
                  </div>
                  Already have an account? <a href="login">Sign in</a>
                </div>
              </CardContent>
            </Grid>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default SignUp;
