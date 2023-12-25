import { Button, TextField } from "@mui/material";
import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            type="text"
            className="form-control"
            placeholder="Enter new Category here "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></TextField>
        </div>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CategoryForm;
