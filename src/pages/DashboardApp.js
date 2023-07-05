/* eslint-disable */
import { useState, useEffect } from 'react';
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Divider,
  CardHeader,
  Card
} from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppTasks, AppTrafficBySite, AppWidgetSummary } from '../sections/@dashboard/app';
import axios from 'axios';
import CryptoChart from 'src/sections/@dashboard/Chart/CryptoCurenciesChart';
import MaticCryptoChart from 'src/sections/@dashboard/Chart/MaticChart';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [msg, setMsg] = useState();
  const [coinname, setCoinname] = useState([]);
  const [customercount, setCustomercount] = useState();
  const [ordertotal, setOrdertotal] = useState();
  const [orderone, setOrderone] = useState();
  useEffect(() => {
   messages();
   getcoins();
   getcustomertotal();
   getordertotal();
   getorderoneday();
  }, []);

const messages =()=>{
  axios
  .get('/msg/getallmsg')
  .then((res) => {
    setMsg(res.data);
    //setLoading(false);
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
  const getcustomertotal = ()=>{
    axios
    .get("/users/getall")
    .then((res) => {
      setCustomercount((res.data).length);
     
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getordertotal = ()=>{
    axios
    .get(`/orderr/getorderdetail`)
    .then((res) => {
      setOrdertotal((res.data).length);
    })
    .catch((err) => {
     
      console.log(err);
    });
  }

  const getorderoneday = ()=>{
    let number=1;
    axios
    .post(`/orderr/getorderbydate`,{number})
    .then((res) => {
      setOrderone((res.data).length); 
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome Booster Admin
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="One Day Sales" total={orderone} icon={'flat-color-icons:sales-performance'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Users" total={customercount} color="info" icon={'gridicons:multiple-users'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={ordertotal} color="warning" icon={'icon-park:health-products'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Runing Coin In App" total={coinname.length} color="error" icon={'pixelarticons:coin'} />
          </Grid>
        
          <Typography  sx={{mt: 6 , ml: 5}}>
          <Typography variant="h4" gutterBottom>
          Ethereum Chart 
          </Typography>
          <CryptoChart/>
       
        </Typography>

          {msg?.map((message, key) => (
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Messages"
                list={[
                  {
                    name: message.username,
                    msg: message.msg,
                    reply: 'Reply',
                  },
                ]}
              />
            </Grid>
          ))}
          <Grid item xs={12} md={8} lg={4}>
            <Card m={5}>
            <CardHeader title={"Runing Coins"} />
            {coinname?.map((item,key)=>(
            <Typography key={key} ml={5} >
               {item}
            </Typography>
            ))}
            </Card>
          </Grid>
        </Grid>
       
       
      </Container>
    </Page>
  );
}
