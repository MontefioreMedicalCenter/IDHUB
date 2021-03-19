import { LOGIN_SUCESSFUL } from '../actions/loginAction';

const initialState = {
    userDetail: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCESSFUL:
            return {
                ...state,
                userDetail: action.payload
            };
        default:
            return state;
    }
}
export default loginReducer;