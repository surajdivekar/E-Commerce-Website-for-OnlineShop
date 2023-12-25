import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");

  //Get All Categories ************************************************************
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Create Product Function *******************************************************
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category._id); //Autocomplete gives whole array hence here Id has send by distracting it.
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 3000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while creating product");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Products</h1>
            <div className="w-50">
              <Autocomplete
                options={categories}
                getOptionLabel={(c) => c.name} //here c = options
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
              <div className="mb-3 ">
                <label className="btn btn-outline-primary ">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <TextField
                  type="text"
                  label="Product Name"
                  className="form-control"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextareaAutosize
                  placeholder="Description"
                  label="product description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <TextField
                  type="number"
                  label="Price"
                  className="form-control"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  type="number"
                  label="Quantity"
                  className="form-control"
                  placeholder="Enter product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  size="small"
                />
              </div>

              <div>
                <Button variant="outlined" onClick={createProduct}>
                  Create Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

// <div className="mb-3">
//                 <select
//                   type="text"
//                   label="Shipping"
//                   className="form-select"
//                   placeholder="Shipping"
//                   size="small"
//                   onChange={(value) => setShipping(value)}
//                 >
//                   <option value="0">No</option>
//                   <option value="1">Yes</option>
//                 </select>
//               </div>
