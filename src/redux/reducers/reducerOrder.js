import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerOrder(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_CHECKIN}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.GET_CHECKIN}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.GET_CHECKIN}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}