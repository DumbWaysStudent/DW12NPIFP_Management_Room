import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerAuth(state = initialState, action) {
    switch (action.type) {
        case `${types.LOGIN_USERS}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.LOGIN_USERS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.LOGIN_USERS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}