import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleLogin = () => ({
    type: types.LOGIN_USERS,
    payload: axios.post(`${API_SERV}/api/v2/login`)
});

export const handleGetUser = (id, token) => ({
    type: types.GET_USER,
    payload: axios.post(`${API_SERV}/api/v2/user/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});