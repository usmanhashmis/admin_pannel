import { createStore, applyMiddleware ,combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Coins from './reducer/reducerCryptocoin'

export function configureStore(preloadedState) {
  const middlewares = [thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  
  const store = createStore(combineReducers({coin : Coins}),preloadedState, middlewareEnhancer)

  return store
}


