/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TextField, Button, Box, Select, MenuItem, InputLabel,FormControl } from '@mui/material';

function Discount() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState({
    coin: '',
    amount: '',
    promocode: '',
  });

  const [coinname, setCoinname] = useState([]);
  const { coin, amount, promocode } = offers;

  
  useEffect(()=>{
    axios
    .get("/prices/getprices")
    .then((res) => {
      setCoinname(res.data[0].coin_name);
      console.log(coinname[0].coin_name);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const discounted = () => {
    axios
      .post('/giftoff/discount', offers)
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard/products');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Coin</InputLabel>
        <Select
           
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={coin}
          label="Coin Name"
          onChange={(e) => {
            setOffers({ ...offers, coin: e.target.value });
          }}
        >
          {coinname?.map((index,key)=>(
          <MenuItem key={key} value={index}>{index}</MenuItem>
         
          ))} 
        </Select>
      </FormControl>
     
        <TextField
          id="outlined-basic"
          label="Amount in coin"
          variant="outlined"
          value={amount ? amount : ''}
          row={8}
          onChange={(e) => {
            setOffers({ ...offers, amount: e.target.value });
          }}
          placeholder="Enter Dicount"
        />
        <TextField
          id="outlined-basic"
          label="Promo Code"
          variant="outlined"
          value={promocode ? promocode : ''}
          row={8}
          onChange={(e) => {
            setOffers({ ...offers, promocode: e.target.value });
          }}
          placeholder="Enter PromoCode"
        />
        <Button variant="contained" component="span" onClick={discounted}>
          Submit
        </Button>
        
      </Box>
    </div>
  );
}

export default Discount;
