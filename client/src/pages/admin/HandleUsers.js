import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Designations } from "../../components/Designations";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HandleUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const navigate = useNavigate();

  //Get All Users***************************************************
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users`
      );
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateDesignation = async () => {
    try {
      const role = 1;
      if (selectedDesignation === "Admin") {
        setSelectedDesignation(role);
      }
      console.log("in Dashhhhh", selectedDesignation);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-designation`,
        {
          id: selectedUsers._id,
          designation: selectedDesignation,
        }
      );
      toast.success(data.message);
      navigate("/dashboard/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10 w-25">
            <h2>Assign Roles</h2>
            <Autocomplete
              size="large"
              options={users}
              getOptionLabel={(u) => u.name}
              value={selectedUsers}
              onChange={(event, value) => {
                setSelectedUsers(value);
                // console.log("selected category: ", value);
              }}
              renderInput={(params) => <TextField {...params} label="Users" />}
            />

            <Accordion>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Type of users</Typography>
              </AccordionSummary>

              <FormControl>
                <RadioGroup
                  name="priceRange"
                  // value={radio}
                  onChange={(e) => {
                    // setRadio(e.target.value);
                    // console.log("selected price: ", e.target.value);
                  }}
                >
                  {Designations.map((d) => (
                    <div key={d._id} style={{ marginBottom: "1px" }}>
                      <FormControlLabel
                        value={d.name} // Convert here array to string
                        control={<Radio />} // Use Radio component here
                        label={d.name}
                        onChange={(e) => setSelectedDesignation(e.target.value)}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </Accordion>
            <Button
              className="reset"
              variant="contained"
              onClick={updateDesignation}
            >
              Assign
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HandleUsers;
