/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TextField, Button, Box, Select, MenuItem, InputLabel,FormControl } from '@mui/material';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,Divider,IconButton,AlertTitle,
  DialogContentText,DialogContent, DialogActions,DialogTitle,Dialog,Alert
} from '@mui/material';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import Scrollbar from '../../../components/Scrollbar';
import { UserListHead } from '../user';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
  { id: 'coinname', label: 'Coin Name', alignRight: false },
  { id: 'discount', label: 'Discount Amount', alignRight: false },
  { id: 'code', label: 'Promo Code', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
 
 
];

function Discount() {
  const navigate = useNavigate();
  const unique_promo = uuid();
  const small_promo = unique_promo.slice(0, 6).toUpperCase();
  const [opendia, setOpendia] = useState(false);
  const [checkdd, setCheckdd] = useState(true);
  const [offers, setOffers] = useState({
    coin: '',
    amount: '',
    promocode: small_promo,
  });

  const [coinname, setCoinname] = useState([]);
  const [getdiscount,setGetdiscount] = useState([]);
  const [error , setError] = useState(false);
  const { coin, amount, promocode } = offers;
  
  
  useEffect(()=>{
     getcoins();
     getdiscounts();
  },[])
  useEffect(()=>{
    getdiscounts();
 },[opendia])

const getdiscounts  = ()=>{
  axios
  .get("/giftoff/getdiscount")
  .then((res) => {
    setGetdiscount(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
}

const getcoins = ()=>{
  axios
  .get("/prices/getprices")
  .then((res) => {
    setCoinname(res.data[0].coin_name);
  })
  .catch((err) => {
    console.log(err);
  });
}

  const discounted = () => {
    if (
      coin && amount && promocode ){
    axios
      .post('/giftoff/discount', offers)
      .then((res) => {
        toast.success("Discount Added", {
          position: toast.POSITION.TOP_RIGHT
        });
        setOpendia(true);
       
      })
      .catch((err) => {
        alert(err);
      });
    }
    else{
      toast.warn("Please Enter — Required Fields!", {
        position: toast.POSITION.TOP_RIGHT
      });
       setError(true);
    }
  };


  const deletediscount = ()=>{
    axios
    .delete("/giftoff/deleterecords")
    .then((res) => {
      toast.success("Discount Deleted", {
        position: toast.POSITION.TOP_RIGHT
      });
      setOpendia(false);
      setCheckdd(false);
    })
    .catch((err) => {
      toast.error("Discount Not Deleted", {
        position: toast.POSITION.TOP_RIGHT
      });
      
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
          type="number"
          required={true}
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
          row={8}
          defaultValue={small_promo}
          inputProps={{ readOnly: true }}
          placeholder="PromoCode"
        />
        <Button variant="contained" component="span" onClick={discounted}>
          Submit
        </Button>
        
      </Box>
      <Divider  />
<div style={{"marginTop":"40px"}}>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                headLabel={TABLE_HEAD}
              />             
                   <TableBody>
                   {getdiscount?.map((item,key)=>(
                     <TableRow
                       hover
                       key={key}
                     >  
                     <TableCell align="left" >{item.coin}</TableCell>
                         <TableCell align="left" >{item.amount}</TableCell>           
                       <TableCell align="left" >{item.promocode}</TableCell>
                       <TableCell><Icon icon="typcn:delete" width="40" height="40"  onClick={deletediscount}/></TableCell>
                   
                     </TableRow>
                     ))}
          
             </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      </div>
    </div>
  );
}

export default Discount;
