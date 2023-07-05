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
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------
const provider = new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9');
const etherweb3 = new Web3(provider);

const providermatic = new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka');
const maticweb3 = new Web3(providermatic);


// ----------------------------------------------------------------------

const SmartContractData = () => {
  var navigate = useNavigate();
  const [products, setProducts] = useState([]); //data receive
  const [balance, setBalance] = useState(); //check balance
  const [balancematic, setBalancematic] = useState(); //check balance matic
  const [withdrawbal, setWithdrawbal] = useState(); //matic balance check
  const [withdrawetherbal, setWithdrawetherbal] = useState(); //ether balance check
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
        // console.log('maticccc', bal);
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

  const withdrawBalance = async () => {
    try {
      const contract = new maticweb3.eth.Contract(ContractAbiMatic, contractAddressMatic);
      const gas = await contract.methods.withdraw().estimateGas({ from: uaccounts });
      const gasPrice = await maticweb3.eth.getGasPrice();
      const data = contract.methods.withdraw().encodeABI();
      const nonce = await maticweb3.eth.getTransactionCount(uaccounts);
      const privatekey = "c10fa5e93ebb57e70d47e22ce20004e0179c581389ff5fc28018c7b7fe55552a"
      const tx = {
        from: uaccounts,
        to: contractAddressMatic,
        gas: gas,
        gasPrice: gasPrice,
        data: data,
        nonce: nonce,
      };
  
      const signedTx = await maticweb3.eth.accounts.signTransaction(tx, privatekey);
      const receipt = await maticweb3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      if (receipt.status) {
        setBalancematic(0);
        alert("Withdrawal successful");
        console.log("Transaction hash:", receipt.transactionHash);
      } else {
        console.error("Transaction failed:", receipt);
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
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
        toast.error("Wallet Not Connected", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else {
      toast.console.warn("Wallet Not Detected", {
        position: toast.POSITION.TOP_RIGHT
      });
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
            <Button variant="contained" onClick={withdrawBalance}>
              Withdraw
            </Button>
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default SmartContractData;
