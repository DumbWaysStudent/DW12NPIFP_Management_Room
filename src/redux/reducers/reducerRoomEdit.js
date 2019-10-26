import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
};

export default function reducerRoomAEdit(state = initialState, action) {
    switch (action.type) {
        case `${types.PATCH_ROOM}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.PATCH_ROOM}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload.data
            };

        case `${types.PATCH_ROOM}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}