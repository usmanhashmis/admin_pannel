/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import { useNavigate } from 'react-router-dom';
import Web3 from 'https://cdn.skypack.dev/web3@1.8.0';
import { ContractAbi } from "./abi";
import {contractAddress , contractAddressMatic} from "./contractAddress";
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

const SmartContractData = () => {
  var navigate = useNavigate();
  const [products, setProducts] = useState([]); ////////data receive
  const [balance, setBalance] = useState(); /////check balance
  const [uaccounts, setUaccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    callevents();
  }, []);

  async function callevents() {
   // var ContractAddress = '0xAa6E95dce2890e4b05753fF4D417E5d6bf9D23ed';

    ///////////////////////
    if (typeof window.ethereum !== 'undefined') {
      await connectwallet();
      // const provider = new Web3.providers.Web3Provider(window.ethereum);
      window.web3 = new Web3(window.ethereum);
      console.log('abi', ContractAbi);
      window.contract = new window.web3.eth.Contract(ContractAbi, contractAddress);
      console.log(window.contract.methods);
      console.log('dd', await window.contract.methods.balance().call());
      await window.contract.methods
        .balance()
        .call()
        .then(function (bal) {
          setBalance(bal);
        });
    }
  }

  const WithdrewBlance = () => {};

  const connectwallet = async () => {
    if (window.ethereum) {
      console.log('detected');
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setUaccounts(accounts[0]);
        console.log('Use this man:', uaccounts);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid>
        <Box sx={{ '& button': { m: 4 }, ml: 5 }}>
          <div>
            <Typography variant="h7">Ether Smart Contract Balance : {balance}</Typography>
          </div>

          <div>
            <Typography variant="h7">You can Withdrew this Balance :</Typography>
          </div>
          <div>
            <Button variant="contained">Withdrew</Button>
          </div>
        </Box>
      </Grid>
      <Box sx={{ '& button': { m: 4 }, ml: 5 }}>
        <div>
          <Typography variant="h7">Matic Smart Contract Balance : {balance}</Typography>
        </div>

        <div>
          <Typography variant="h7">You can Withdrew this Balance :</Typography>
        </div>
        <div>
          <Button variant="contained">Withdrew</Button>
        </div>
      </Box>
    </Grid>
  );
};

export default SmartContractData;
