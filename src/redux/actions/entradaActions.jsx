import axios from "axios";
import { entradaTypes } from "../constants/entradaTypes";

const baseUrl = process.env.REACT_APP_BASE_URL + "/movimentos/entrada";

export const getAllEntradas = (dataInicial, dataFinal, op) => async (dispatch, getState) => {
    dispatch({
        type: entradaTypes.REQ_GET_ENTRADA,
    });
    // api request
    const {userLoginStore: {infoUsuario}} = getState(); 
    try {
        const { data } = await axios.get(`${baseUrl}/getall`, { 
            params:{dataInicial, dataFinal, op},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_GET_ENTRADA,
            payload: data
        });
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: entradaTypes.FAIL_GET_ENTRADA,
            payload: message
        });
    }
}

export const getEntradasChart = (dataInicial, dataFinal, op) => async (dispatch, getState) => {
    dispatch({
        type: entradaTypes.REQ_GET_ENTRADA_CHART,
    });
    // api request
    const {userLoginStore: {infoUsuario}} = getState(); 
    try {
        const { data } = await axios.get(`${baseUrl}/getsum`, { 
            params:{dataInicial, dataFinal, op},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_GET_ENTRADA_CHART,
            payload: data
        });
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: entradaTypes.FAIL_GET_ENTRADA_CHART,
            payload: message
        });
    }
}

export const getCountEntradas = (dataInicial, dataFinal, op) => async (dispatch, getState) => {
    dispatch({
        type: entradaTypes.REQ_GET_ENTRADA_CHART,
    });
    // api request
    const {userLoginStore: {infoUsuario}} = getState(); 
    try {
        const { data } = await axios.get(`${baseUrl}/getcount`, { 
            params:{dataInicial, dataFinal, op},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_GET_ENTRADA_CHART,
            payload: data
        });
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: entradaTypes.FAIL_GET_ENTRADA_CHART,
            payload: message
        });
    }
}

export const insertEntrada = (entrada) => async (dispatch, getState) => {
    dispatch({type: entradaTypes.REQ_INSERT_ENTRADA});
    try {
        const {userLoginStore: {infoUsuario}} = getState(); 
        //api request
        const { data } = await axios.post(baseUrl, entrada, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: entradaTypes.SUCCESS_INSERT_ENTRADA,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: entradaTypes.FAIL_INSERT_ENTRADA,
            payload: error.message
        });
    }
}