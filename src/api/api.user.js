import {logR} from '@/services/utils';
import instance from './main';

const path = '/account';

class ApiUser {
  async createUser(dataRegistration) {
    logR('warn', 'ApiUser: createUser');
    dataRegistration.gender = 'male';
    dataRegistration.isAdmin = false;
    console.log(dataRegistration);
    const response = await instance.post(`${path}/signup`, dataRegistration);
    console.log(response);
    return response;
  }

  // async users() {
  //   logR('warn', 'API.USERS: userss');
  //   return instance.get(`${path}/index`);
  // }
  async update(payload) {
    logR('warn', 'API.USERS: update');
    return instance.put(`${path}/update`, payload);
  }

  // async delete(userId) {
  //   logR('warn', 'API.USERS:delete');
  //   return instance.delete(`${path}/delete/${userId}`);
  // }
}

export default new ApiUser();
