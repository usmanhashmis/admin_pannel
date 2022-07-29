import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Reducer from "./reducer/reducerCryptocoin";

export function configureStore(preloadedState) {
  const middlewares = [logger, thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(Reducer,preloadedState, middlewareEnhancer)

  return store
}


