import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import * as entrada from "./reducers/entradaReducer.jsx";
import * as movimento from "./reducers/movimentoReducer.jsx";
import * as saida from "./reducers/saidaReducer.jsx";
import * as login from "./reducers/authReducers.jsx";


const reducer = combineReducers({
  // movimentos store
  getAllMovimentoStore: movimento.getAllMovimentosReducer,



  // saidas store
  getAllSaidaStore: saida.getAllSaidasReducer,
  getSaidasSumStore: saida.getSaidasSumReducer,
  newSaidaStore: saida.newSaidaReducer,

});

const compositor = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({ reducer }, compositor(applyMiddleware(thunk)));

export default store;
