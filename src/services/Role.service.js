/**
 * Created by charnjeetelectrovese@gmail.com on 4/8/2020.
 */
import {postRequest, formDataRequest} from '../libs/AxiosService.util';

export async function serviceCreateRole(params) {
    return await postRequest('roles/create', params);
}

export async function serviceUpdateRole(params) {
    return await formDataRequest('roles/update', params);
}

export async function serviceDeleteRole(params) {
    return await postRequest('roles/delete', params);
}

export async function serviceDetailRole(params) {
    return await formDataRequest('roles/detail', params);
}
export async function serviceDetailPermissions(params) {
    return await formDataRequest('roles/permissions', params);
}

export async function serviceGetRole (params) {
    return await postRequest('roles', params);
}

export async function serviceRoleCheck (params) {
    return await postRequest('roles/check', params);
}
