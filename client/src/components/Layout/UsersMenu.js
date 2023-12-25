import React, { useEffect, useState } from "react";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const UsersMenu = () => {
  const [user, setUser] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //Get All Users***************************************************
  // const getLoggedInUser = async () => {
  //   const user = JSON.parse(localStorage.getItem("auth"));
  // };

  // getLoggedInUser();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("auth"));
    setUser(storedUser);
    console.log("In useEffect", storedUser);
  }, []);

  console.log("User data", user);
  // console.log("*************************", user.designation);
  const designation = user?.user?.designation;
  const isSupervisor = designation === "Supervisor";
  const isWorker = designation === "Worker";
  console.log("value of isSupervisor ", isSupervisor);
  console.log("value of Worker ", isWorker);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders">
          <h3>Users Panel</h3>
          <ListItemButton
            component={Link}
            to="/dashboard/user/billing"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText>Billing</ListItemText>
          </ListItemButton>

          {!isSupervisor && (
            <ListItemButton
              component={Link}
              to="/dashboard/user/estimation"
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText>Estimation</ListItemText>
            </ListItemButton>
          )}

          {!isSupervisor && !isWorker && (
            <ListItemButton
              component={Link}
              to="/dashboard/user/production"
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText>Production</ListItemText>
            </ListItemButton>
          )}

          <ListItemButton
            component={Link}
            to="/dashboard/user/operation"
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText>Operations</ListItemText>
          </ListItemButton>

          {!isSupervisor && (
            <ListItemButton
              component={Link}
              to="/dashboard/user/raw-materials"
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 3)}
              // disabled
            >
              <ListItemText>Raw Materials</ListItemText>
            </ListItemButton>
          )}
        </List>
      </Box>
    </>
  );
};

export default UsersMenu;
