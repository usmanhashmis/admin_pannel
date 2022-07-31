import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";


const Valuestoredb = () => {
const location =useLocation();
const navigate = useNavigate();
 const value=location.state;

 useEffect(()=>{
    axios
          .post("http://localhost:420/prices/add", value)
          .then((res) => { 
            console.log("request done");
            navigate('/dashboard/user');
          })
          .catch((err) => {
            console.log(err);
          });
 })

 return(
    <div>done</div>
 )
}


export default Valuestoredb;