/* eslint-disable */
import { useState, useEffect } from 'react';

import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Alert,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
// mock
import moment from 'moment';
// ----------------------------------------------------------------------

const TABLE_HEAD = [

  { id: 'id', label: 'Product ID', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'bill', label: 'Total Bill', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'coin', label: 'Coin', alignRight: false },
  { id: 'mail', label: 'UserName', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];
// ----------------------------------------------------------------------
export default function Productorder() {
  const [allprices, setAllprices] = useState();
  const [statuss, setStatuss] = useState(false);
  // const [compl, setCompl] = useState();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true); /////API loading data
  const [s, setS] = useState('');
  const [count,setCount]=useState(1);
  const [p,setP]=useState(10);


  useEffect(() => {
    orderdetails();
  }, [count]);

  const orderdetails = () => {
    axios
      .get(`/orderr/getorderdetail/${count}`)
      .then((res) => {
        setOrder(res.data.records);
        setP(res.data.num)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  const duration = (number) => {
     setS(number)
    axios
      .post(`/orderr/getorderbydate`,{number})
      .then((res) => {
        setOrder(res.data)
        //orderdetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page title="Product Order">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order List
          </Typography>
        </Stack>
        {loading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />{' '}
          </Box>
        ) : (
          <>
            {' '}
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
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {order?.map((item, key) => (
                        <TableRow hover key={key}>
      

                          <TableCell align="left">
                            {item.productdetail?.map((items, i) => (
                              <div>{items.productid}</div>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            {item.productdetail?.map((items, i) => (
                              <div>{items.quantity}</div>
                            ))}
                          </TableCell>

                          <TableCell align="left">{item.totalBill}</TableCell>
                          <TableCell align="left">
                            {moment(item.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                          </TableCell>
                          <TableCell align="left">{item.coin}</TableCell>
                          <TableCell align="left">{item.email}</TableCell>
                          <TableCell align="left">{item.address}</TableCell>
                          <TableCell align="left">{item.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <Stack spacing={2}  alignItems= 'center' justify= 'center'>
              <Pagination count={p}  color="primary"  onChange={(e,page)=>setCount(page)} />
              </Stack>
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
}
