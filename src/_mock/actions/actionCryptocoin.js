import axios from 'axios';

const datapara = {
  currency: 'USD',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 12,
  meta: true,
};

// const dataFetched = (data) => {
//   return {
//     type: 'fetched',
//     payload: data,
//   };
// };

export const GetPrices = () => (dispatch) => {
  axios
    .post('https://api.livecoinwatch.com/coins/list', datapara, {
      headers: {
        'content-Type': 'application/json',
        'x-api-key': '96315795-d069-44c6-b618-8ecb6ac71611',
      },
    })
    .then((res) => {
      dispatch({ type:"fetched",payload: res?.data });
    })
    .catch((err) => console.log(err, 'error in crypto api'));
};
