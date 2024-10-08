/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

// import { ServiceFormFetchProviderRequests } from '../ServiceForms/ProviderRequest.ServiceForm';
// import { fetchPRequests } from '../ServiceForms/User.ServiceForm';
import store from '../store';
import Constants from '../config/constants';
import { serviceFormGet, serviceFormUpdate} from "../services/ServiceForm.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_SERVICE_FORM';
export const FETCHED = 'FETCHED_SERVICE_FORM';
export const FETCHED_FAIL = 'FETCHED_FAIL_SERVICE_FORM';
export const FETCHED_FILTER = 'FETCHED_FILTER_SERVICE_FORM';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_SERVICE_FORM';
export const FILTER = 'FILTER_SERVICE_FORM';
export const RESET_FILTER = 'RESET_FILTER_SERVICE_FORM';
export const SET_SORTING = 'SET_SORTING_SERVICE_FORM';
export const SET_FILTER = 'SET_FILTER_SERVICE_FORM';
export const SET_PAGE = 'SET_PAGE_SERVICE_FORM';
export const CHANGE_PAGE = 'CHANGE_PAGE_SERVICE_FORM';
export const CHANGE_STATUS= 'CHANGE_STATE_SERVICE_FORM';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_SERVICE_FORM';
export const CREATE_DATA = 'CREATE_SERVICE_FORM';
export const UPDATE_DATA = 'UPDATE_SERVICE_FORM';
export const DELETE_ITEM = 'DELETE_SERVICE_FORM';


export function actionFetchServiceForm(index = 1, sorting = {}, filter = {}) {
    const request = serviceFormGet({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: { data: data.data, page: index }});
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


export function actionUpdateServiceForm(data) {
    const request = serviceFormUpdate(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}



export function actionChangePageServiceFormRequests(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

// export function nextPRequestsClick() {
//     return {
//         type: NEXT_PREQUESTS,
//         payload: null,
//     };
// }
//
// export function prevPRequestsClick() {
//     return {
//         type: PREV_PREQUESTS,
//         payload: null,
//     };
// }

export function actionFilterServiceFormRequests(value) {
    const request = null;////ServiceFormFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusServiceFormRequests(id, status) {
    // const request = ServiceFormFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterServiceFormRequests() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageServiceFormRequests(page) {
    const stateData = store.getState().ServiceForm;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchServiceForm(serverPage + 1, sortingData, {query, query_data: queryData}));
            // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
        }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    // if (this.props.totalUsers <= ((this.props.currentPage + 1) * 100)) {
    //         // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order);
    //         this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    //     }

}
