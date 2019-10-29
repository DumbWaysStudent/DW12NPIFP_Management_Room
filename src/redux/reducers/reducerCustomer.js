import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerCustomer(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_CUSTOMERS}_PENDING`:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            };

        case `${types.GET_CUSTOMERS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.GET_CUSTOMERS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
            };
        case `${types.POST_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            };

        case `${types.POST_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.POST_CUSTOMER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
            };
        case `${types.PATCH_CUSTOMER}_PENDING`:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            };

        case `${types.PATCH_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.PATCH_CUSTOMER}_REJECTED`:
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