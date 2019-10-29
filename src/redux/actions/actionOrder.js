import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleGetOrder = (token) => ({
    type: types.GET_CHECKIN,
    payload: axios.get(`${API_SERV}/api/v2/checkin`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});