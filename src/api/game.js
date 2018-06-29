import request from '@/utils/request';

export function getOneGame(gid) {
  return request({
    url: '/api/getOneGame',
    method: 'post',
    data: {
      gid
    }
  });
}

export function getMyGame() {
  return request({
    url: '/api/getMyGame',
    method: 'post',
  });
}

export function getAllGame() {
  return request({
    url: '/api/getAllGame',
    method: 'post'
  });
}

export function organizeGame(gameInfo) {
  return request({
    url: '/api/organizeGame',
    method: 'post',
    data: {
      gameInfo
    }
  });
}

export function joinGame(gameInfo) {
  return request({
    url: '/api/joinGame',
    method: 'post',
    data: {
      gameInfo
    }
  });
}

export function quitGame(gameInfo) {
  return request({
    url: '/api/quitGame',
    method: 'post',
    data: {
      gameInfo
    }
  });
}
