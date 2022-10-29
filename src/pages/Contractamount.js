import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {  ContractWithdrew } from '../sections/@dashboard/contractw';


// ----------------------------------------------------------------------

export default function Contracts() {
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Smart Contract Amount
          </Typography>
        </Stack>

        <ContractWithdrew/>
      </Container>
    </Page>
  );
}
