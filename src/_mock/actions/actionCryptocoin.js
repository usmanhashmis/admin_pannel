import axios from 'axios';

const datapara = {
  currency: 'USD',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 15,
  meta: true,
};


export const GetPrices = () => (dispatch) => {
  dispatch({type : "initiated"})
  axios
    .post('https://api.livecoinwatch.com/coins/list', datapara, {
      headers: {
        'content-Type': 'application/json',
        'x-api-key': '96315795-d069-44c6-b618-8ecb6ac71611',
      },
    })
    .then((res) => {
      dispatch({ type:"fetched",payload: res.data });
    })
    .catch((err) =>
    { 
      console.log(err, 'error in crypto api') 
      dispatch({type :"failed",payload :err.message})
    })

};
