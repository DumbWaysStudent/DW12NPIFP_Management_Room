import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'
// import { url } from 'inspector';

export const handleGetOrder = (token) => ({
    type: types.GET_CHECKIN,
    payload: axios.get(`${API_SERV}/api/v2/checkin`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleAddCheckIn = (data, token) => ({
    type: types.ADD_CHECKIN,
    payload: axios.post(`${API_SERV}/api/v2/orders`, data, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

// export const handleAddCheckOut = (data, token) => {
//     console.log('TEST', data, token)
//     return ({
//         type: types.ADD_CHECKOUT,
//         payload: axios.delete(`${API_SERV}/api/v2/order`, data
//             // headers: { "Authorization": `Bearer ${token}` }
//         )
//     });
// }

export const handleAddCheckOut = (data, token) => ({
    type: types.ADD_CHECKOUT,
    payload: axios({
        method: 'delete',
        url: `${API_SERV}/api/v2/order`,
        data: data,
        headers: { "Authorization": `Bearer ${token}` }
    })
})