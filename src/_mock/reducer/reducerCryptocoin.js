
const initialState = {
  data: [],
};

// const GetPrices = (action,state = initialState) => {
//   switch (action.type) {
//     case "fetched": {
//       return {
//         ...state,
//         data: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };
// eslint-disable-next-line
const GetPrices =(state=initialState,action)=>{
    if(action.type ==="fetched"){
        return{
            ...state,
            data:action.payload,
        };
    }
    return state;
};

export default GetPrices;