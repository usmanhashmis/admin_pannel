import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {  ProductCard } from '../sections/@dashboard/products';
// mock

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addproduct"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>

        <ProductCard/>
      </Container>
    </Page>
  );
}
