import { Types } from '../actions/actionTypes';

const initialState = {
    profile: {
        fullName: '',
        codeNumber: '',
        password: '',
        email: '',
        phone: '',
        classroom: {},
        avatar: ''
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default: {
            return state;
        }
    }
}

export default profileReducer;