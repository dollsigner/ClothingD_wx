import { request } from '@/api/request.js'

//test 请求
export const reqTest = () => {
	return request({
		url: '/hello',
		method: 'GET',
	});
}