import request from '@/utils/request';
import Cookies from 'js-cookie';

export function login(username, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  });
}

export function getLoginInfo() {
  return request({
    url: '/api/getUserInfo',
    method: 'post',
    data: {
      cookies: Cookies.get('userInfo')
    }
  });
}

export function register(username, password, role) {
  return request({
    url: '/api/register',
    method: 'post',
    data: {
      username,
      password,
      role
    }
  });
}

export function updateLoginInfo(userInfo) {
  return request({
    url: '/api/updateLoginInfo',
    method: 'post',
    data: {
      cookies: Cookies.get('userInfo'),
      userInfo
    }
  });
}

export function updatePassword(userInfo) {
  return request({
    url: '/api/updatePassword',
    method: 'post',
    data: {
      userInfo
    }
  });
}

export function deleteUser() {
  return request({
    url: '/api/deleteUser',
    method: 'post',
    data: {
      cookies: Cookies.get('userInfo')
    }
  });
}

export function getMyGame() {
  return request({
    url: '/api/getMyGame',
    method: 'post'
  });
}

export function organizeGame(gameInfo) {
  return request({
    url: '/api/organizeGame',
    method: 'post',
    data: {
      cookies: Cookies.get('userInfo'),
      gameInfo
    }
  });
}
