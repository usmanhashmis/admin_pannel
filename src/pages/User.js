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
  Alert
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
  { id: 'rate', label: 'Current Price', alignRight: false },
  { id: 'symbol', label: 'Symbol', alignRight: false },
  { id: 'suspended', label: 'Transection Satuts', alignRight: false },
  { id: '' },
];
let coins_address="15wMvzd6jcxSkb8GxXJizRTQ3dVQiUvfTbSEm3R8x81QieDb";
// ----------------------------------------------------------------------
export default function User() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state?.data);
  const navigate = useNavigate();

  const [allprices, setAllprices] = useState();
  const [checkedcoin,setCheckedcoin] = useState([]);
  const [select,setSelect] = useState();

  const sendparameters = 
  // useEffect(() => {
  //   setInterval(()=>{
  //     dispatch(GetPrices());
  //     setAllprices(data2);
  //   },3000)
  
  // },[allprices]);

  useEffect(() => {
      dispatch(GetPrices());
      setAllprices(data2);
  },[]);

  const handleClick=(e)=>{
    
     setCheckedcoin([...checkedcoin,e.target.name]);
     console.log(checkedcoin);
     //setCheckedcoin(checkedcoin.filter((checkcoin)=>checkcoin !== e.target.name))
  }

  const onsubmit=()=>{
    
    axios
    .post("http://localhost:420/prices/add",{coin_name:checkedcoin,coin_address:coins_address})
    .then((res) => { 
      console.log("request done"); 
      alert("ok");
      console.log(res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Coins List
          </Typography>
          <Button variant="contained" onClick={onsubmit} startIcon={<Iconify icon="eva:plus-fill"  />}>
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
                         <Checkbox name={item.name}  onChange={handleClick} />
                       </TableCell>
                       <TableCell component="th" scope="row" padding="none">
                         <Stack direction="row" alignItems="center" spacing={2}>
                           <Avatar alt="name" src={item.png32} />
                           <Typography variant="subtitle2" noWrap>
                             {item.name}
                           </Typography>
                         </Stack>
                       </TableCell>
                       <TableCell align="left">{item.rate.toFixed(6)}</TableCell>
                       <TableCell align="left">{item.symbol}</TableCell>
                       <TableCell align="left">{item.rank}</TableCell>
             
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
