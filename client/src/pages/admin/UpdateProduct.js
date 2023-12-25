import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //Get Single Product ************************************************************
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      setCategory(data.product.category); //Initial data to fields
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      // setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();

    getSingleProduct();
    // eslint-disable-next-line
  }, []);

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

  // Update Product Function *******************************************************
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category._id); //Autocomplete gives whole array hence here Id has send by distracting it.
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // productData.append("shipping", shipping);

      console.log("Button clicked before", productData);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      console.log("Button clicked after");

      if (data?.success) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 3000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while updating product");
    }
  };

  // Delete Product Function *******************************************************
  const deleteProduct = async () => {
    try {
      let answer = window.prompt(
        "Are you sure ! You want to delete this product ?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );

      toast.success("Product deleted successfully");
      setTimeout(() => {
        navigate("/dashboard/admin/products");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while deleting product");
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
            <h1>Update Products</h1>
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
                {photo ? (
                  <div className="text">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>
                ) : id ? ( // Check if id is defined
                  <div className="text">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>
                ) : (
                  <div className="text">Loading..</div>
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
                <Button variant="outlined" onClick={updateProduct}>
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={deleteProduct}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

/*<div className="mb-3">
                <select
                  type="text"
                  label="Shipping"
                  className="form-select"
                  placeholder="Shipping"
                  size="small"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>*/
