import React from 'react'
import { useLocation } from 'react-router-dom';

const Valuestoredb = () => {
const location =useLocation();
const value=location.state.stores;
  return (
    <div>{console.log(value)}</div>
  )
}


export default Valuestoredb;