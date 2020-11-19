import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://eleme1-october.herokuapp.com/api/',
        timeout: 5000
    })

    return instance(config);
}