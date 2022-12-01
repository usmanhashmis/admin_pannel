/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button,Grid , CircularProgress} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ColorPreview } from '../../../components/color-utils';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
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

  useEffect(() => {
    axios.get('categories/getproduct').then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  }, []);

  const deleteproduct = (id) => {
    axios
      .delete(`/categories/${id}`)
      .then((res) => {
        alert("Data Deleted");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> :
    <Grid container spacing={3}>
      

        {products.map((index, key) => (
          <Grid key={key} item xs={12} sm={6} md={3}>
            
            <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <ProductImgStyle alt="img" src={index.product_img} />
            </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                <Typography variant="subtitle2" noWrap>
                  {index.product_name}
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