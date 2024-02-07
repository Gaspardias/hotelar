import axios from "axios";
import { saidaTypes } from "../constants/saidaTypes";

const baseUrl = process.env.REACT_APP_BASE_URL + "/movimentos/saida";

export const getAllSaidas =(data1,data2,op) => async (dispatch, getState) => {

    dispatch({
        type: saidaTypes.REQ_GET_SAIDA,
    });
    try {
        // api request
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.get(baseUrl, { 
            params:{data1, data2, op},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: saidaTypes.SUCCESS_GET_SAIDA,
            payload: data
        });
        
    } catch (error) { 
        dispatch({
            type: saidaTypes.FAIL_GET_SAIDA,
            payload: error.message
        });
    }
}
export const getSaidasSum =(data1,data2,op) => async (dispatch, getState) => {

    dispatch({
        type: saidaTypes.REQ_GET_SAIDA_CHART,
    });
    try {
        // api request
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.get(`${baseUrl}/getsum`, { 
            params:{data1, data2, op},
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        });
        dispatch({
            type: saidaTypes.SUCCESS_GET_SAIDA_CHART,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: saidaTypes.FAIL_GET_SAIDA_CHART,
            payload: error.message
        });
    }
}

export const newSaida =(saida) => async (dispatch, getState) => {
    dispatch({type: saidaTypes.REQ_INSERT_SAIDA});
    try {
        //api request
        const {userLoginStore: {infoUsuario}} = getState(); 
        const { data } = await axios.post(baseUrl, saida, { 
            headers:{ authorization: `Bearer ${infoUsuario.Token}`}
        })
        dispatch({
            type: saidaTypes.SUCCESS_INSERT_SAIDA,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: saidaTypes.FAIL_INSERT_SAIDA,
            payload: error.message
        });
    }
}
