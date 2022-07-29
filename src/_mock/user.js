import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {GetPrices} from './actions/actionCryptocoin';

let data2 ;
export const Datas=()=>{
  const dispatch = useDispatch();
  data2 = useSelector((state) => state?.GetPrices?.data);

  useEffect(() => {
    dispatch(GetPrices());
  }, []);

}
 const users1 = data2?.map((index) => ({
    
  id: index.id,
  avatarUrl: index.symbol,
  name: index.name,
  company: index.rate,

}));

export default users1;