import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerRoomAdd(state = initialState, action) {
    switch (action.type) {
        case `${types.POST_ROOM}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.POST_ROOM}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.POST_ROOM}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}