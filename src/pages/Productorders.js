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
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
// mock
// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'confirm', label: 'Order Completed', alignRight: false },
  { id: 'id', label: 'Product ID', alignRight: false },
  { id: 'mail', label: 'User Email', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'bill', label: 'Total Bill', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];
// ----------------------------------------------------------------------
export default function Productorder() {



  const [allprices, setAllprices] = useState();
  const [statuss,setStatuss] = useState(false);
  const [compl,setCompl] = useState();
  const [order,setOrder] = useState();
  const [loading, setLoading] = useState(true); /////API loading data

  useEffect(() => {
     orderdetails();
  },[]);

  const orderdetails =()=>{
    axios
    .get("/orderr/getorderdetail")
    .then((res) => {
      setOrder(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const completed = (id)=>{
    console.log("idss",id);
    axios
    .put(`/orderr/status/${id}`)
    .then((res) => {
      orderdetails();
    })
    .catch((err) => {
      console.log(err);
    });
  }
 


  return (
    <Page title="Product Order">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order List
          </Typography>
        </Stack>
        {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> :
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />             
                     <TableBody>
              {order?.map((item,key)=>(
                     <TableRow
                       hover
                       key={key}
                     >                 
                       <TableCell>
                       <Button variant="contained" onClick={()=>completed(item._id)}>If Delivered</Button>
                       </TableCell>

                       <TableCell component="th" scope="row" padding="none">
                        {item.productdetail.map((itemd,key)=>(
                            <Stack direction="row" alignItems="center" spacing={2} key={key}>
                            {/* <Avatar alt="name" src={} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {itemd.productid}
                            </Typography>
                            
                          </Stack>
                          
                        ))}
                       
                       </TableCell>
                       <TableCell align="left">{item.quantity} </TableCell>
                       <TableCell align="left">{item.totalBill}{item.coin}</TableCell>
                       <TableCell align="left" key={key}>{item.status }</TableCell>
                 
                       
             
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
