/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';


export async function serviceFetchSource(params) {
    return await postRequest('/blogs', params);
}
export async function serviceCreateSource(params) {
    return await formDataRequest('/blogs/create', params);
}

export async function serviceUpdateSource(params) {
    return await formDataRequest('blogs/update', params);
}

export async function serviceDeleteSource(params) {
    return await formDataRequest('blogs/delete', params);
}

export async function serviceSourceExists(params) {
    return await postRequest('blogs/check/slug', params);
}

export async function serviceUploadSourceImage(params) {
    return await formDataRequest('blogs/upload/image', params);
}

export async function serviceGetTagsList(params) {
    return await postRequest('keywords', params);
}

export async function serviceSourceDetails(params){
    return await postRequest('blogs/details', params);

}
