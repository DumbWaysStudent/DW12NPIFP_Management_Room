import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleGetRoom = (token) => ({
    type: types.GET_ROOMS,
    payload: axios.get(`${API_SERV}/api/v2/rooms`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
});

export const handleAddRoom = (data, token) => {
    console.log('data dari Action Room', data, token)
    return ({
        type: types.POST_ROOM,
        payload: axios({
            method: 'post',
            url: `${API_SERV}/api/v2/room`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    });
}


export const handleEditRoom = (id, data, token) => {
    console.log("ini data patch", data)
    return ({
        type: types.PATCH_ROOM,
        payload: axios({
            method: 'patch',
            url: `${API_SERV}/api/v2/room/${id}`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    })
}