/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router";
import { TextField, Button, Box } from "@mui/material";

function Discount() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState({
        coin: "",
        amount:"",
        promocode:"",
        
      });
      
    const { coin, amount,promocode} = offers;
const discounted =()=>{
    axios.post("/giftoff/discount", offers).then((res) => {
        console.log(res.data);
        navigate("/dashboard/products");
      }).catch((err)=>{
        alert(err);
      });
}

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
        <TextField
          id="outlined-basic"
          label="Coin Name"
          variant="outlined"
          value={coin ? coin : ''}
          row={8}
          onChange={(e) => {
            setOffers({ ...offers, coin: e.target.value });
          }}
          placeholder="Coin Name"
        />
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
