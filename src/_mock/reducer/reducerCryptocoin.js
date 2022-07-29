
const initialState = {
  data: [],
};

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