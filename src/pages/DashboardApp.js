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
      .get('http://localhost:420/msg/getallmsg')
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
          Hi, Welcome
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={71} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={135} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={193} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Runing Coin In App" total={10} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

  
          {msg?.map((message, key) => {
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                 title="Messages"
                 list={[
                   {
                     name: "dd",
                     msg: "Kindly give me some detail",
                     reply: "Reply",
                     
                   },
                   {
                     name: 'UserName',
                     msg: "Kindly give me some detail",
                     reply: "Reply",
                     
                   },
                  
                 ]}
               />
               
             
               
            </Grid>;
            })} 
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks title="Tasks" list={[{ id: '1', label: 'Create FireStone Logo' }]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
