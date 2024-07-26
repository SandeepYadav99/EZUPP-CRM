
import store from '../store';
import Constants from '../config/constants';

import EventEmitter from "../libs/Events.utils";
import { serviceCreateSource, serviceDeleteSource, serviceFetchSource, serviceUpdateSource } from '../services/Source.service';


export const FETCH_INIT = 'FETCH_INIT_SOURCE';
export const FETCHED = 'FETCHED_SOURCE';
export const FETCHED_FAIL = 'FETCHED_FAIL_SOURCE';
export const FETCHED_FILTER = 'FETCHED_FILTER_SOURCE';
export const FETCH_NEXT = 'FETCH_NEXT_SOURCE';
export const FILTER = 'FILTER_SOURCE';
export const RESET_FILTER = 'RESET_FILTER_SOURCE';
export const SET_SORTING = 'SET_SORTING_SOURCE';
export const SET_FILTER = 'SET_FILTER_SOURCE';
export const SET_PAGE = 'SET_PAGE_SOURCE';
export const CHANGE_PAGE = 'CHANGE_PAGE_SOURCE';
export const CHANGE_STATUS= 'CHANGE_STATE_SOURCE';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_SOURCE';
export const CREATE_DATA = 'CREATE_SOURCE';
export const UPDATE_DATA = 'UPDATE_SOURCE';
export const DELETE_ITEM = 'DELETE_ITEM_SOURCE';

export function actionFetchSource(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceFetchSource({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: { data: data?.data, page: index }});
                dispatch({ type: SET_SERVER_PAGE, payload: index });
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateSource(data) {
    const request = serviceCreateSource(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            } else {
                 EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: data.message, type: 'error'});
            }
        })
    }
}

export function actionUpdateSource(data) {
    const request = serviceUpdateSource(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Edited Successfully', type: 'success'});
                dispatch({type: UPDATE_DATA, payload: data.data})
            } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: data.error, type: 'error'});
            }
        })
    }
}

export function actionDeleteSource(id) {
    const request = serviceDeleteSource({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}



export function actionChangePageSource(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}


export function actionFilterSource(value) {
    const request = null;
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusSource(id, status) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
    };
}

export function actionResetFilterSource() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageSource(page) {
    const stateData = store.getState().Source;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchSource(serverPage + 1, sortingData, {query, query_data: queryData}));
    } 
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
}
