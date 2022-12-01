/* eslint-disable */
import { useState, useEffect } from 'react';
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,ListItemAvatar,ListItemText,List, ListItem,Avatar ,Divider} from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppTasks, AppTrafficBySite, AppWidgetSummary } from '../sections/@dashboard/app';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [msg, setMsg] = useState();
  useEffect(() => {
    axios
      .get('/msg/getallmsg')
      .then((res) => {
        setMsg(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome Admin
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={71} icon={'flat-color-icons:sales-performance'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={135} color="info" icon={'gridicons:multiple-users'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={193} color="warning" icon={'icon-park:health-products'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Runing Coin In App" total={2} color="error" icon={'pixelarticons:coin'} />
          </Grid>

  
          {msg?.map((message, key) => (
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                 title="Messages"
                 list={[
                   {
                     name: message.username,
                     msg: message.msg,
                     reply: "Reply",
                     
                   },
                  
                 ]}
               />
               
             
               
            </Grid>
            ))} 
          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks title="Tasks" list={[{ id: '1', label: 'Create FireStone Logo' }]} />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
