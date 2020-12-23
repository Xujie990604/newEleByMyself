import { request } from './index.js';

export function getUserAddress() {
    return request({
        url: `/user/user_info/${localStorage.login}`
    })
}