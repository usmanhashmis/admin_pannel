/* eslint-disable */
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});
const Adddata = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const edit = id ? true : false;

  const [category, setCategory] = useState({
    product_name: "",
    description: "",
    price:"",
    product_img:"",
    pricesale:"",
  });
  
  const { product_name, description,price,product_img,pricesale } = category;

  const onupload =async e=>{
  const files = e.target.files
  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append('upload_preset','softuneimg')
                    
  fetch(
    "http://api.cloudinary.com/v1_1/db6yuxnub/image/upload/",
    {
      method: "post",
      body: formData,
    }).
    then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      setCategory({ ...category, product_img: responseData.secure_url });
      console.log(product_img);
    })
  } 

  useEffect(() => {
    if (edit) {
      axios
        .get("http://localhost:420/categories/getproduct" + id)

        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <h1 style={{ color: "black", marginTop: "1rem"  }}>
        Add Product 
      </h1>
      <div className=" mt-3 container">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={product_name ? product_name : ""}
            row={8}
            onChange={(e) => {
              setCategory({ ...category, product_name: e.target.value });
            }}
            placeholder="Product Name"
          />
          <TextField
            id="outlined-basic"
            label="Description"
            value={description ? description : ""}
            onChange={(e) => {
              setCategory({ ...category, description: e.target.value });
            }}
            placeholder="Product Description"
          />
          <TextField
            id="outlined-basic"
            label="Price in USDT"
            value={price ? price: ""}
            onChange={(e) => {
              setCategory({ ...category, price: e.target.value });
            }}
            placeholder="Price in USDT"
          />
          <TextField
            id="outlined-basic"
            label="Price Sale"
            value={pricesale ? pricesale: ""}
            onChange={(e) => {
              setCategory({ ...category, pricesale: e.target.value });
            }}
            placeholder="Discount"
          />
            <label htmlFor="contained-button-file">
            <Input
              
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={onupload}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>

        </Box>
        <Button
          variant="contained"
          onClick={() => {
            if (!edit) {
              axios.post("http://localhost:420/categories/addproduct", category).then((res) => {
                console.log(res.data);
                navigate("/dashboard/products");
              });
            } else {
              axios
                .put("http://localhost:420/categories/" + id, category)
                .then((res) => {
                  console.log("Product has been edited " + res.data.Categories);
                  navigate("/dashboard/products");
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate("/dashboard/products");
            }
          }}
        >
          {edit ? "Edit" : "Submit Data"}
        </Button>
      </div>
    </div>
  );
};
export default Adddata;