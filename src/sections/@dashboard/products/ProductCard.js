/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button,Grid , CircularProgress, AlertTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,} from '@mui/material';
  import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ColorPreview } from '../../../components/color-utils';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------


const ShopProductCard=()=> {

  var navigate = useNavigate();
  const [products, setProducts] = useState([]); ////////data receive
  const [loading, setLoading] = useState(true); /////API loading data
  const [opendia, setOpendia] = useState(false);
  useEffect(() => {
    axios.get('/categories/getallproduct').then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  }, []);

  const deleteproduct = (id) => {
    axios
      .delete(`/categories/${id}`)
      .then((res) => {
       
       setOpendia(true);
      })
      .catch((err) => toast.error("Product Not Deleted!", {
        position: toast.POSITION.TOP_RIGHT
      }));
  };

  return (
    <>
    {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> :
    <Grid container spacing={3}>
       {opendia && (
            <Dialog
              open={opendia}
              onClose={opendia}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Deleted"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Product Deleted Successfully</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Icon
                  icon="twemoji:ok-button"
                  width="35"
                  height="35"
                  onClick={() => {
                    toast.success("Product Detelted Successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
                    setOpendia(false);
                    window.location.reload();
                  }}
                />
              </DialogActions>
            </Dialog>
          )}

        {products.map((index, key) => (
          <Grid key={key} item xs={12} sm={6} md={3}>
            
            <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <ProductImgStyle alt="img" src={index.product_img} />
            </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                <Typography variant="subtitle2" noWrap>
                  {index.product_id}
                </Typography>
                <Typography>Available Stock:{index.product_stock}</Typography>
              </Link>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">
                  &nbsp;
                  {fCurrency(index.price)}
                </Typography>
                
                <Link  color="inherit" underline="hover" component={RouterLink} to={"/dashboard/addproduct/edit/" + index._id}>Edit</Link>
                <Button  onClick={()=>{deleteproduct(index._id)}}>Delete</Button>
              </Stack>
            </Stack>
            </Card>
            
                  
          </Grid>
        ))}
      
    </Grid>}
    </>
  );
}

export default ShopProductCard;