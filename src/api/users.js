import request from '@/utils/request';

export function getUserCount() {
  return request({
    url: '/api/users/count',
    method: 'get'
  });
}
