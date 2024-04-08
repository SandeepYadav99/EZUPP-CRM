/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateRole(params) {
    return await postRequest('role/create', params);
}

export async function serviceUpdateRole(params) {
    return await formDataRequest('role/update', params);
}

export async function serviceDeleteRole(params) {
    return await formDataRequest('role/delete', params);
}

export async function serviceDetailRole(params) {
    return await formDataRequest('roles/detail', params);
}
export async function serviceDetailPermissions(params) {
    return await formDataRequest('roles/permissions', params);
}

export async function serviceGetRole (params) {
    return await postRequest('role', params);
}

export async function serviceRoleCheck (params) {
    return await postRequest('role/check', params);
}
