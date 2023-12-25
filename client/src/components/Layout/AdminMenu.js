import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders">
          <h3>Admin Panel</h3>
          <ListItemButton
            component={Link}
            to="/dashboard/admin/create-category"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText>Category</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/admin/products"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText>Products</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/admin/create-product"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText>Create Products</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/admin/handle-orders"
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText>Orders</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/admin/users"
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText>Users</ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};

export default AdminMenu;
