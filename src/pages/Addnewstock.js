/* eslint-disable */
import { useState } from 'react';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {  Addstock } from '../sections/@dashboard/stock';
// mock

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function Addnewstock() {
  return (
    <Page title="Dashboard: Add New Stock">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profit Calculation
          </Typography>
        </Stack>

        <Addstock/>
      </Container>
    </Page>
  );
}
