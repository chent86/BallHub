import request from '@/utils/request';

export function getMyCourt() {
  return request({
    url: '/api/getMyCourt',
    method: 'post',
  });
}

export function getAllCourt() {
  return request({
    url: '/api/getAllCourt',
    method: 'post'
  });
}

export function addCourt(courtInfo) {
  return request({
    url: '/api/addCourt',
    method: 'post',
    data: {
      courtInfo
    }
  });
}
