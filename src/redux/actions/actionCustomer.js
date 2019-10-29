import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleGetCustomer = (token) => ({
    type: types.GET_CUSTOMERS,
    payload: axios.get(`${API_SERV}/api/v2/customers`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleAddCustomer = (data, token) => ({
    type: types.POST_CUSTOMER,
    payload: axios.post(`${API_SERV}/api/v2/customer`, data, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleEditCustomer = (id, data, token) => ({
    type: types.PATCH_CUSTOMER,
    payload: axios.patch(`${API_SERV}/api/v2/customer/${id}`, data, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});