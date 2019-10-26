import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleGetRoom = (token) => ({
    type: types.GET_ROOMS,
    payload: axios.get(`${API_SERV}/api/v2/rooms`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleAddRoom = (data, token) => ({
    type: types.POST_ROOM,
    payload: axios.post(`${API_SERV}/api/v2/room`, data, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});