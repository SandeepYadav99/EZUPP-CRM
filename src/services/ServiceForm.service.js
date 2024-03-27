/**
 * Created by charnjeetelectrovese@gmail.com on 12/19/2019.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';



export async function serviceFormUpdate(params) {
    return await formDataRequest('service/form/update', params);
}



export async function serviceFormGet (params) { 
    return await postRequest('service/form/list', params);
}






