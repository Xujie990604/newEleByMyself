import { request } from './index.js';

export function getCityInfo() {
    return request({
        url: 'posts/cities'
    })
}