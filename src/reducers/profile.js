import { Types } from '../actions/actionTypes';

const initialState = {
    profile: {
        fullName: 'Duy',
        codeNumber: '123456789zzzz',
        password: '',
        email: '',
        phone: '',
        classroom: '',
        avatar: ''
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                profile: action.payload.user
            }
        default: {
            return state;
        }
    }
}

export default profileReducer;