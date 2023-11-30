import {logR} from '@/services/utils';
import instance from './main';

const path = '/account';

class ApiAuth {
  async login(dataLogin) {
    logR('warn', 'ApiAuth: login');
    return instance.post(`${path}/signin`, dataLogin);
  }

  async getAccessToken(refreshToken) {
    return instance.post(`${path}/getNewAccessToken`, {
      refreshToken: refreshToken,
    });
  }

  getRefreshToken(accessToken) {
    return instance.post(`${path}/refreshToken`, {
      accessToken: accessToken,
    });
  }

  async refreshToken(token) {
    logR('warn', 'ApiAuth: refreshToken');
    return instance.post(`${path}/token`, token);
  }
}

export default new ApiAuth();
