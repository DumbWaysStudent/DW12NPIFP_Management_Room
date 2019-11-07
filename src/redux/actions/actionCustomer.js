import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleGetCustomer = (token) => ({
    type: types.GET_CUSTOMERS,
    payload: axios.get(`${API_SERV}/api/v2/customers`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleAddCustomer = (data, token) => {
    console.log('ini data di action', data)
    return ({
        type: types.POST_CUSTOMER,
        payload: axios({
            method: 'post',
            url: `${API_SERV}/api/v2/customer`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": 'application/json',
                "Content-Type": 'multipart/form-data'
            }
        })
    });
}

export const handleEditCustomer = (id, data, token) => {
    console.log('ini data dari action Patch Customer', data)
    return ({
        type: types.PATCH_CUSTOMER,
        payload: axios({
            method: 'patch',
            url: `${API_SERV}/api/v2/customer/${id}`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": 'application/json',
                "Content-Type": 'multipart/form-data'
            }
        })
    });
}

// .patch(`${API_SERV}/api/v2/customer/${id}`, data, {
//     headers: { "Authorization": `Bearer ${token}` }
// })