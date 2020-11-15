import {Types} from '../actions/actionTypes';

const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.token,
                isLoading: false
            };
        case Types.SIGN_IN:
            return {
                ...state,
                userToken: action.token,
                isSignout: false
            };
        case Types.SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                userToken: null
            };
        default: 
            return state;
    }
}

export default authReducer;