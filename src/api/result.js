import request from '@/utils/request';

export function updateResult(resultInfo) {
  return request({
    url: '/api/updateResult',
    method: 'post',
    data: {
      resultInfo
    }
  });
}

export function getMyResult() {
  return request({
    url: '/api/getMyResult',
    method: 'post'
  });
}
