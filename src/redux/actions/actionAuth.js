import * as types from '../types'
import axios from 'axios'
import { API_SERV } from '../../assets/server'

export const handleLogin = () => ({
    type: types.LOGIN_USERS,
    payload: axios.post(`${API_SERV}/api/v2/login`)
});