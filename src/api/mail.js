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

export function sendInvitation(inviteInfo) {
  return request({
    url: '/api/sendInvitation',
    method: 'post',
    data: {
      inviteInfo
    }
  });
}

export function sendApplication(applyInfo) {
  return request({
    url: '/api/sendApplication',
    method: 'post',
    data: {
      applyInfo
    }
  });
}

export function sendReply(replyInfo) {
  return request({
    url: '/api/sendReply',
    method: 'post',
    data: {
      replyInfo
    }
  });
}

export function sendPigeon(pigeonInfo) {
  return request({
    url: '/api/sendPigeon',
    method: 'post',
    data: {
      pigeonInfo
    }
  });
}
