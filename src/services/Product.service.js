import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateProduct(params) {
    return await postRequest('products/create', params);
}

export async function serviceUpdateProduct(params) {
    return await postRequest('products/update', params);
}

export async function serviceDeleteProduct(params) {
    return await postRequest('products/delete', params);
}
export async function serviceGetProduct (params) {
    return await postRequest('products', params);
}

export async function serviceProductCheck (params) {
    return await postRequest('products/check', params);
}
export async function serviceGetProductDetails (params) {
    return await postRequest('products/detail', params);
}
