import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {  Discount } from '../sections/@dashboard/discount';
// mock

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function Discountoffer() {
  return (
    <Page title="Dashboard: Discount">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Discount
          </Typography>

        </Stack>

        <Discount/>
      </Container>
    </Page>
  );
}
