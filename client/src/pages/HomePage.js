import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/Auth";
import axios from "axios";
// import { Radio } from "antd";
import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaRegHeart } from "react-icons/fa";
import { Prices } from "../components/Prices";

const HomePage = () => {
  // const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [radio, setRadio] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //Get All Categories***************************************************
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   } else {
  //     fetchMoreProducts();
  //   }
  // }, [page]);

  const fetchMoreProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );

      const newProducts = data?.products;
      if (newProducts && newProducts.length > 0) {
        setProducts([...products, ...data?.products]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      if (products.length + data?.products.length === total) {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
      console.log(error);
    }
  };

  // Get All products *********************************************************
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts(data?.products);
    } catch (error) {
      setHasMore(false);
      console.log(error);
    }
  };

  //Get Total Count of products ***************************************************
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    // getAllProducts();
    if (selectedCategory || radio) {
      filterProducts();
    } else {
      fetchMoreProducts();
    }
  }, [selectedCategory, radio]);

  // Get Filtered Products *******************************************
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { selectedCategory, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row ">
        <div className="col-md-2">
          <h5 className="text-center">Filters</h5>
          <Autocomplete
            size="small"
            options={categories}
            getOptionLabel={(c) => c.name}
            value={selectedCategory}
            onChange={(event, value) => {
              setSelectedCategory(value);
              // console.log("selected category: ", value);
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Price</Typography>
            </AccordionSummary>

            <FormControl>
              <RadioGroup
                name="priceRange"
                value={radio}
                onChange={(e) => {
                  setRadio(e.target.value);
                  // console.log("selected price: ", e.target.value);
                }}
              >
                {Prices.map((p) => (
                  <div key={p._id} style={{ marginBottom: "1px" }}>
                    <FormControlLabel
                      value={p.array.toString()} // Convert here array to string
                      control={<Radio />} // Use Radio component here
                      label={p.name}
                    />
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </Accordion>
          <Button
            className="reset"
            variant="outlined"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
        <div className="homepage col-md-10">
          <h1>All Products</h1>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreProducts}
            hasMore={hasMore}
            loader={<h6>Loading...</h6>}
            endMessage={<h4>You all set ...!</h4>}
          >
            <div className="home_products d-flex flex-wrap">
              {products?.map((p) => (
                <Card className="home_product_card " key={p._id}>
                  <>
                    <img
                      className="home_product_img"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </>
                  <CardContent className="home_card_content">
                    <h5>{p.name}</h5>
                    <p>{p.description.substring(0, 25)}...</p>
                    <p>{p.price}</p>
                    <Button>More</Button>
                    <Button>
                      Add to Cart &nbsp;
                      <FaRegHeart />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
