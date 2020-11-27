import {Types} from '../actions/actionTypes';

const initialState = {
    qrcode: {
        _id: '',
        classes: [],
        subject: [],
        isOutOfDate: undefined,
        time: 30000
    }
}

const qrcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_QRCODE: 
            return {
                ...state,
                qrcode: action.payload
            }
        default: {
            return state;
        }
    }
}

export default qrcodeReducer;