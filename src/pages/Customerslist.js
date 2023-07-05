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

  { id: 'time', label: 'Register Time', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },

];
// ----------------------------------------------------------------------
export default function Customerlist() {
  const [allprices, setAllprices] = useState();
  const [statuss, setStatuss] = useState(false);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true); /////API loading data
  const [s, setS] = useState('');
  const [count,setCount]=useState(0);
  const [p,setP]=useState(10);

  

  useEffect(() => {
    customerdetails();
  }, [count]);

  const customerdetails = () => {
    axios
      .get(`/users/getcustomerdetail/${count}`)
      .then((res) => {
        setOrder(res.data.records);
        console.log("dcscsc",res.data.records);
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
      .post(`/users/getcustomerbydate`,{number})
      .then((res) => {
        setOrder(res.data)
        //orderdetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page title="Customers">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customer List
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
                            {moment(item.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                          </TableCell>
                          <TableCell align="left">{item.username}</TableCell>
                          <TableCell align="left">{item.email}</TableCell>
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
