/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import {
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  AlertTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';
import DropdownCategory from 'src/sections/@dashboard/products/DropdownCategory';
const Input = styled('input')({
  display: 'none',
});
const Adddata = (props) => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 6).toUpperCase();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const edit = id ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState({
    categoryWise:"",
    product_name: '',
    product_id: small_id,
    description: '',
    price: '',
    product_img: '',
    product_stock: '',
    purchase_price: '',
  });
  const [alerts, setAlerts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [opendia, setOpendia] = useState(false);

  const {categoryWise, product_name, product_id, description, price, product_img, product_stock, purchase_price } = category;

  const onupload = async (e) => {
    setLoading(true); // for loading
    const files = e.target.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'softuneimg');

    fetch('http://api.cloudinary.com/v1_1/db6yuxnub/image/upload/', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setCategory({ ...category, product_img: responseData.secure_url });
        console.log(product_img);
        setLoading(false);
        setAlerts(true);
      });
  };

  useEffect(() => {
    if (edit) {
      axios
        .get('/categories/' + id)

        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div title="Add Product">
      {error == true && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          Please Enter — <strong>Required Fields!</strong>
        </Alert>
      )}
      {alerts == true && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlerts(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Product IMG Uploaded!
        </Alert>
      )}
      <h1 style={{ color: 'black', marginTop: '1rem' }}>Add Product</h1>
      <div className=" mt-3 container">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="on"
        >
         <DropdownCategory setCategory={setCategory} category={category}/>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={product_name ? product_name : ''}
            row={8}
            required={true}
            onChange={(e) => {
              setCategory({ ...category, product_name: e.target.value });
            }}
            placeholder="Product Name"
          />
          <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            row={8}
          
            type="text"
            defaultValue={small_id}
            inputProps={{ readOnly: true }}
            placeholder="Product ID"
          />
          <TextField
            id="outlined-basic"
            label="Description"
            value={description ? description : ''}
            required={true}
            onChange={(e) => {
              setCategory({ ...category, description: e.target.value });
            }}
            placeholder="Product Description"
          />
          <TextField
            id="outlined-basic"
            label="Price in USDT"
            value={price ? price : ''}
            type="number"
            required={true}
            onChange={(e) => {
              setCategory({ ...category, price: e.target.value });
            }}
            placeholder="Price in USDT"
          />
          <TextField
            id="outlined-basic"
            label="Available Stock"
            value={product_stock ? product_stock : ''}
            type="number"
            required={true}
            onChange={(e) => {
              setCategory({ ...category, product_stock: e.target.value });
            }}
            placeholder="Available Stock"
          />
          <TextField
            id="outlined-basic"
            label="Purchasing Price"
            value={purchase_price ? purchase_price : ''}
            type="number"
            required={true}
            onChange={(e) => {
              setCategory({ ...category, purchase_price: e.target.value });
            }}
            placeholder="Purchase Price in USDT"
          />
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onupload} />
            {loading ? (
              <LoadingButton loading variant="contained">
                Upload
              </LoadingButton>
            ) : (
              <Button variant="contained" component="span">
                Upload IMG
              </Button>
            )}
          </label>
          {opendia && (
            <Dialog
              open={opendia}
              onClose={opendia}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{product_name}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Product Added Successfully</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Icon
                  icon="twemoji:ok-button"
                  width="35"
                  height="35"
                  onClick={() => {
                    setOpendia(false);
                    navigate('/dashboard/products');
                  }}
                />
              </DialogActions>
            </Dialog>
          )}

          <Button
            variant="contained"
            onClick={() => {
              if (!edit) {
                if (
                  product_name &&
                  product_id &&
                  description &&
                  price &&
                  product_img &&
                  product_stock &&
                  purchase_price
                ) {
                  axios
                    .post('/categories/addproduct', category)
                    .then((res) => {
                      setOpendia(true);
                      // navigate('/dashboard/products');
                    })
                    .catch((err) => {
                      alert(err.response.data.msg);
                    });
                } else {
                  setError(true);
                }
              } else {
                axios
                  .put('/categories/' + id, category)
                  .then((res) => {
                    console.log('Product has been edited ' + res.data.Categories);
                    setOpendia(true);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            {edit ? 'Edit' : 'Submit Data'}
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default Adddata;
