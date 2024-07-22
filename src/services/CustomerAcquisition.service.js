/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';


export async function serviceFetchCustomerAcqusition(params) {
    return await postRequest('/blogs', params);
}
export async function serviceCreateCustomerAcqusition(params) {
    return await formDataRequest('/blogs/create', params);
}

export async function serviceUpdateCustomerAcqusition(params) {
    return await formDataRequest('blogs/update', params);
}

export async function serviceDeleteCustomerAcqusition(params) {
    return await formDataRequest('blogs/delete', params);
}

export async function serviceCustomerAcqusitionExists(params) {
    return await postRequest('blogs/check/slug', params);
}

export async function serviceUploadCustomerAcqusitionImage(params) {
    return await formDataRequest('blogs/upload/image', params);
}

export async function serviceGetTagsList(params) {
    return await postRequest('keywords', params);
}

export async function serviceCustomerAcqusitionDetails(params){
    return await postRequest('blogs/details', params);

}
