/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid, TextField } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { styled } from '@mui/material/styles';
// components

import { useNavigate } from 'react-router-dom';
import Web3 from 'https://cdn.skypack.dev/web3@1.8.0';
import { ethers } from 'ethers';
import { ContractAbi, ContractAbiMatic } from './abi';
import { contractAddress, contractAddressMatic } from './contractAddress';
// ----------------------------------------------------------------------
const provider = new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9');
const etherweb3 = new Web3(provider);

const providermatic = new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka');
const maticweb3 = new Web3(providermatic);


// ----------------------------------------------------------------------

const SmartContractData = () => {
  var navigate = useNavigate();
  const [products, setProducts] = useState([]); ////////data receive
  const [balance, setBalance] = useState(); /////check balance
  const [balancematic, setBalancematic] = useState(); /////check balance matic
  const [withdrawbal, setWithdrawbal] = useState(); ////matic balance check
  const [withdrawetherbal, setWithdrawetherbal] = useState(); ////ether balance check
  const [uaccounts, setUaccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function callingmethods() {
      if (typeof window.ethereum !== 'undefined') {
        await connectwallet();
      }

      calleventsether(ContractAbi, contractAddress, setBalance);
      checketherwithdrawbalacne(ContractAbi, contractAddress, setWithdrawetherbal);
      ///matic
      calleventsmatic(ContractAbiMatic, contractAddressMatic, setBalancematic);
      checkmaticwithdrawbalacne(ContractAbiMatic, contractAddressMatic, setWithdrawbal);
    }
    callingmethods();
  }, []);

  async function calleventsether(abi, address, setFun) {
    const contract = new etherweb3.eth.Contract(abi, address);
    await contract.methods
      .balance()
      .call()
      .then(function (bal) {
        const convertedb = etherweb3.utils.fromWei(bal);
        setFun(convertedb);
      });
  }

  async function calleventsmatic(abi, address, setFun) {
    const contract = new maticweb3.eth.Contract(abi, address);
    await contract.methods
      .balance()
      .call()
      .then(function (bal) {
        console.log('maticccc', bal);
        const convertedb = maticweb3.utils.fromWei(bal);
        setFun(convertedb);
      });
  }

  ////

  const WithdrewBlanceether = async () => {


    // const contract = new etherweb3.eth.Contract(ContractAbi,contractAddress);
    // try{
    //     await ethereum.request({ method: 'eth_requestAccounts'})
    //   const amount= ethers.utils.parseEther((0.0).toString())._hex;
    //   await contract.methods.withdraw().send({from: uaccounts,value:amount}).then(function (bal) {
    //     alert("withdrew done ether");
    //     setBalancematic(0);
    //   }).catch((err)=>{console.log("err",err)});

    // }catch(err){console.log("error",err)}
    var contract = new etherweb3.eth.Contract(ContractAbi, contractAddress);

    await contract.methods
      .withdraw()
      .send({
        from: uaccounts,
        value: ethers.utils.parseEther((0.0).toString())._hex,
      })
      .then((receipt) => {
        console.log(receipt);
      });
  
  };

  const WithdrewBlance = async () => {
    // console.log("done");
    // const paramter = maticweb3.utils.toWei(withdrawbal, 'ether');
    // const contract = new maticweb3.eth.Contract(ContractAbiMatic,contractAddressMatic);
    // await contract.methods.withdraw(paramter).send({from: uaccounts}).then(function (bal) {
    //     alert("withdrew done");
    //     setBalancematic(0);
    //   });
  };

  const checketherwithdrawbalacne = async (abi, address, setCheckbal) => {
    const contract = new etherweb3.eth.Contract(abi, address);
    await contract.methods
      .checkwithdrawbalance()
      .call()
      .then(function (bal) {
        const convertedb = etherweb3.utils.fromWei(bal);
        console.log(convertedb);
        setCheckbal(convertedb);
      });
  };

  const checkmaticwithdrawbalacne = async (abi, address, setCheckbal) => {
    const contract = new maticweb3.eth.Contract(abi, address);
    await contract.methods
      .checkwithdrawbalance()
      .call()
      .then(function (bal) {
        const convertedb = maticweb3.utils.fromWei(bal);
        console.log(convertedb);
        setCheckbal(convertedb);
      });
  };

  const connectwallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setUaccounts(accounts[0]); ///store wallet account address
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={6}>
        <Button startIcon={<Iconify icon="logos:metamask-icon" />}>DISCONNECTE WALLET</Button>
        <Typography sx={{ border: '2px solid', borderRadius: '26px', p: 1, borderColor: '#cd6116' }}>
          {uaccounts}
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid>
          <Box sx={{ '& button': { m: 4 }, ml: 5 }}>
            <div>
              {console.log('bala', balance)}
              <Typography variant="h7">Ether Smart Contract Balance : {balance}</Typography>
            </div>

            <div>
              <Typography variant="h7">You can Withdraw this Balance :{withdrawetherbal}</Typography>
            </div>
            <div>
              <Button variant="contained" onClick={WithdrewBlanceether}>
                Withdraw
              </Button>
            </div>
          </Box>
        </Grid>
        <Box sx={{ '& button': { m: 4 }, ml: 5 }}>
          <div>
            {console.log('balamatic', balancematic)}
            <Typography variant="h7">Matic Smart Contract Balance : {balancematic}</Typography>
          </div>
          <div>
            <Typography variant="h7">You can Withdraw this Balance :{withdrawbal}</Typography>
          </div>
          <div>
            <Button variant="contained" onClick={WithdrewBlance}>
              Withdraw
            </Button>
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default SmartContractData;
