/* eslint-disable */
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListHead } from '../sections/@dashboard/user';
// mock
//import USERLIST from '../_mock/user';
import { useSelector, useDispatch } from "react-redux";
import {GetPrices} from '../_mock/actions/actionCryptocoin';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Coin Name', alignRight: false },
  { id: 'symbol', label: 'Symbol', alignRight: false },
  { id: 'rate', label: 'Current Price', alignRight: false },
  { id: 'suapended', label: 'Transection Satuts', alignRight: false },
  { id: '' },
];
// ----------------------------------------------------------------------
export default function User() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state?.GetPrices?.data);
  const [allprices, setAllprices] = useState();

  useEffect(() => {
    dispatch(GetPrices());
    setAllprices(data2);
    console.log("new",allprices?.map(e=>e.name));
    console.log("length",allprices?.length);
  },[]);
  const handleClick=()=>{
     console.log("checkmethod");
  }
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Coins List
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Coins
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />             
                     <TableBody>
              {allprices?.map((item,key)=>(
                     <TableRow
                       hover
                       key={key}
                       tabIndex={-1}
                       role="checkbox"
                     >
                       <TableCell padding="checkbox">
                         <Checkbox onChange={handleClick} />
                       </TableCell>
                       <TableCell component="th" scope="row" padding="none">
                         <Stack direction="row" alignItems="center" spacing={2}>
                           {/* <Avatar alt="name" src={avatarUrl} /> */}
                           <Typography variant="subtitle2" noWrap>
                             {item.name}
                           </Typography>
                         </Stack>
                       </TableCell>
                       <TableCell align="left">{item.rate}</TableCell>
                       <TableCell align="left">{item.symbol}</TableCell>
                       <TableCell align="left">{item.name}</TableCell>
             
                     </TableRow>
                     ))}
               </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
