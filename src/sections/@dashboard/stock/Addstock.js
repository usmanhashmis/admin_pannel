/* eslint-disable */
/* eslint-disable */
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,Box,
  Pagination
} from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import {GetPrices} from '../../../_mock/actions/actionCryptocoin';
// components
import Page from '../../../components/Page';
import { UserListHead } from '../user';


const TABLE_HEAD = [
    { id: 'Productid', label: 'Product ID', alignRight: false },
    { id: 'saleprice', label: 'Sale Price', alignRight: false },
    { id: 'purchaseprice', label: 'Purchasing Price', alignRight: false }, 
    { id: 'coinname', label: 'Coin Name', alignRight: false },
    { id: 'mail', label: 'Mail', alignRight: false },

    { id: 'profit', label : 'Profit', alignRight: false },
   
  ];

function ProfitCalculations() {
  const dispatch = useDispatch();
  const {error, data} = useSelector((state) => state.coin);
  const [products,setProducts] = useState([]);
  const [allprices, setAllprices] = useState();
  const [loading, setLoading] = useState(true);
  const [calculate , setCalculate] = useState(0);
  const [p,setP]=useState(10);
  const [count,setCount]=useState(1);
  const [s, setS] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    
    const timer_id= setInterval(()=>{
       dispatch(GetPrices());
       if(data)
       {
         
          var newData=data.filter((item)=>item.name=="Ethereum" || item.name=="Polygon");
          setAllprices(newData);
       // var newData=allprices.filter((item)=>item.name==coinnames);
         console.log("coinsss",newData)
       }
       
     },30000)
    
     return () => { 
       clearInterval(timer_id)
     }
 
   },[data]);

   useEffect(()=>{
    getproducts();
   },[count])

 const getproducts =()=>{
   axios
   .get(`/orderr/getorderdetail/${count}`)
   .then((res) => {
    setProducts(res.data.records);
    setP(res.data.num)
     setLoading(false);
     console.log("dddd",products);
   }) 
   .catch((err) => {
     console.log(err);
   });
 }

 const duration = (number) => {
  setS(number)
 axios
   .post(`/orderr/getorderbydate`,{number})
   .then((res) => {
     setProducts(res.data)
     //orderdetails();
   })
   .catch((err) => {
     console.log(err);
   });
};


  return (
    <Page title="Profit Calculation">
    <Container>
      {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> :
      (<>
        <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Duration</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={s}
                label="Age"
                onChange={(e)=>duration(e.target.value)}
              >
                <MenuItem value={1} name="One Day">One Day</MenuItem>
                <MenuItem value={7} name="Seven Day">Seven Day</MenuItem>
                <MenuItem value={30} name="One Month">One Month</MenuItem>
              </Select>
            </FormControl>
      <Card>
        
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
          
              <UserListHead
                headLabel={TABLE_HEAD}
              />             
                   <TableBody>
                   {products?.map((item,key)=>(
                     <TableRow
                       hover
                       key={key}
                     >               
                        <TableCell align="left">{item.productdetail?.map((item,i)=>(<div>{item.productid}</div>) )}</TableCell>
                        <TableCell align="left">{item.productdetail?.map((item,i)=>(<div>{item.price}</div>) )}</TableCell>
                        <TableCell align="left">{item.productdetail?.map((item,i)=>(<div>{item.purchase_price}$</div>) )}</TableCell>
                         
                       <TableCell align="left" >{item.coin}</TableCell>
                       <TableCell align="left" >{item.email}</TableCell>
                        

                        {allprices?.map((coinname,e)=>(
                        <>
                           {(coinname.name==item.coin)&& ( <TableCell align="left">{item.productdetail?.map((item,i)=>(<div>{((item.price*coinname.rate)-item.purchase_price).toFixed(4)}$</div>) )}
                      </TableCell>)}         
                        </>
                        ))} 
                     </TableRow>
                     ))}
          
             </TableBody>
             <div style={{"marginLeft":"15px"}}>Total: </div>
            </Table>
            
          </TableContainer>
          <Stack spacing={2}>
              <Pagination count={p}  color="primary" onChange={(e,page)=>setCount(page)} />
              </Stack>   
      </Card>
      </>)
}
    </Container>
  </Page>
  );
}

export default ProfitCalculations;
