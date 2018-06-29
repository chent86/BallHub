import request from '@/utils/request';

export function sendResultMail() {
  return request({
    url: '/api/sendResultMail',
    method: 'post',
  });
}

export function getMyMail() {
  return request({
    url: '/api/getMyMail',
    method: 'post',
  });
}

export function deleteMail(mailInfo) {
  return request({
    url: '/api/deleteMail',
    method: 'post',
    data: {
      mailInfo
    }
  });
}
