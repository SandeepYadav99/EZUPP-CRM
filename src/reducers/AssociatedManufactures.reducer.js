import {
    DONE_JOB_CANDIDATES,
   
    INIT_JOB_CANDIDATES,
  
} from "../actions/AssociatedManufactures.action";


const initialState = {
    associatedUser: [],
    isCandidatesFetching: false,
  
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        
        case INIT_JOB_CANDIDATES: {
            return {...state, isCandidatesFetching: true};
        }
      
        case DONE_JOB_CANDIDATES: {
           
            return {
                ...state,
                associatedUser: action.payload,
                isCandidatesFetching: false,
            };
        }
      
        default: {
            return state;
        }
    }
}
