import { request } from './index.js';

export function getCode(phone) {
    return request({
        url: 'posts/sms_send',
        method: 'post',
        data: {
            phone: phone
        }
    })
}

export function loginBtn(phone, code) {
    return request({
        url: 'posts/sms_back',
        method: 'post',
        data: {
            phone: phone,
            code: code
        }
    })
}
