
import { request } from './index.js';

export function getCode(phone) {
    return request({
        url: '/api/posts/sms_send',
        method: 'post',
        data: {
            phone: phone
        }
    })
}

export function loginBtn(phone, code) {
    return request({
        url: '/api/...',
        method: 'post',
        data: {
            phone: phone,
            code: code
        }
    })
}
