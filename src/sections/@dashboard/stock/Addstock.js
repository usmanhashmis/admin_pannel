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
  CircularProgress,Box
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { UserListHead } from '../user';

const TABLE_HEAD = [
    { id: 'Productname', label: 'Product Name', alignRight: false },
    { id: 'purchaseprice', label: 'Purchasing Price', alignRight: false },
    { id: 'saleprice', label: 'Sale Price', alignRight: false },
    { id: 'coinname', label: 'Coin Name', alignRight: false },
    { id: 'profit', label : 'Profit', alignRight: false },
   
  ];


function ProfitCalculations() {
    const [products,setProducts] = useState([]);
    const [orders,setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getproducts();
    orderdetail();
 },[]);

 const getproducts =()=>{
   axios
   .get("http://localhost:420/categories/getproduct")
   .then((res) => {
     setProducts(res.data);
     setLoading(false);
   })
   .catch((err) => {
     console.log(err);
   });
 }

 const orderdetail =()=>{
    axios
    .get("http://localhost:420/orderr/getorderdetail")
    .then((res) => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }





  return (
    <Page title="Profit Calculation">
    <Container>
      {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> :
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                headLabel={TABLE_HEAD}
              />             
                   <TableBody>
            {products?.map((itemproduct,key)=>(
                   <TableRow
                     hover
                     key={key}
                   >             
                     { orders?.map((itemorder,i)=> (
                      <div  key={i}>
                      <TableCell align="left">{itemproduct.product_name}</TableCell>
                      <TableCell align="left">{itemproduct.purchase_price}</TableCell>    
                     <TableCell align="left" >dummy</TableCell>
                     <TableCell align="left" >fvdfvdf</TableCell>
                     <TableCell align="left" >dfvdfv</TableCell>
                 
                 
                     </div>
                     ))} 
                   </TableRow>
                   ))}
             </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
}
    </Container>
  </Page>
  );
}

export default ProfitCalculations;
