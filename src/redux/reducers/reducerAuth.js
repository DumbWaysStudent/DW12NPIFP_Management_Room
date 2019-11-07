import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerAuth(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_USER}_PENDING`:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            };

        case `${types.GET_USER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.GET_USER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
            };
        default:
            return state;
    }
}