import {LOOKUP_SUCCESSFULL} from '../actions/workListSheet'

const initialState = {
    workListmodel: {}
};

const worklistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOOKUP_SUCCESSFULL:
            return {
                ...state,
                workListmodel: action.payload
            };
        default:
            return state;
    }
}

export default worklistReducer;