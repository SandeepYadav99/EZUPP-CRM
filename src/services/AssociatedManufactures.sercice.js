import { postRequest} from '../libs/AxiosService.util';

export async function serviceAssociatedList(params) {
    return await postRequest('roles/users', params);
}