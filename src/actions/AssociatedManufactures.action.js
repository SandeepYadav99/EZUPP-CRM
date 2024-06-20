

import { serviceAssociatedList } from "../services/AssociatedManufactures.sercice";
export const INIT_JOB_CANDIDATES = 'INIT_JOB_CANDIDATES';
export const DONE_JOB_CANDIDATES = 'DONE_JOB_CANDIDATES';


export function actionGetJobOpeningCandidates(index = 1, sorting = {}, filter = {},openingId) {
    const request = serviceAssociatedList({index,sorting, filter ,role_id: openingId });
    return (dispatch) => {
        dispatch({ type: INIT_JOB_CANDIDATES, payload: null });
        request.then((data) => {
         
            if (!data.error) {
                dispatch({type: DONE_JOB_CANDIDATES, payload: data.data})
            }
        })
    }
}




