import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleLogin = () => ({
    type: types.LOGIN_USERS,
    payload: axios.post(`${API_SERV}/api/v2/login`)
});

export const handleGetUser = (id, token) => ({
    type: types.GET_USER,
    payload: axios({
        method: 'get',
        url: `${API_SERV}/api/v2/user/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
});

export const handleEditUser = (id, data, token) => {
    console.log('ini dari action', id, data, token)
    return ({
        type: types.PATCH_USER,
        payload: axios({
            method: 'patch',
            url: `${API_SERV}/api/v2/user/${id}`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
    });
}