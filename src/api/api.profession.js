import {logR} from '@/services/utils';
import instance from './main';

class ApiProfession {
  path = 'profession';

  async getProfessions() {
    logR('warn', 'ApiUser: createUser');
    const response = await instance.get(`${this.path}`);
    return response;
  }
  async createProfession(createProfessionDto) {
    logR('warn', 'ApiUser: createProfession');
    const response = await instance.post(
      `${this.path}/new`,
      createProfessionDto
    );
    return response;
  }

  async updateProfession(updateProfessionDto, professionId) {
    logR('warn', 'ApiUser: updateProfession');
    const response = await instance.put(
      `${this.path}/update/${professionId}`,
      updateProfessionDto
    );
    return response;
  }
}

export default new ApiProfession();
