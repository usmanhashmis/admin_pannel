import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
// ----------------------------------------------------------------------

  
const data={
  "currency": "USD",  
  "sort": "rank",
  "order": "ascending",
  "offset": 0,
  "limit": 12,  
  "meta": true  
}
const Values=()=>{
  const [dataCrypto,setDataCrypto]=useState(null) ;
  useEffect(()=>{

    axios.post('https://api.livecoinwatch.com/coins/list',data,{
    headers: { 
    'content-Type': 'application/json',
    'x-api-key': '96315795-d069-44c6-b618-8ecb6ac71611'
    }}).
    then((res)=>{ 
        setDataCrypto(res.data)
        console.log(dataCrypto);
    }).
    catch(err=>console.log(err,"error in crypto api"))
    },[])
}



const users = [...Array(24)].map((_, index) => ({
    
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
