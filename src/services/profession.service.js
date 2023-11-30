import {logR} from './utils';
import ApiProfession from '@/api/api.profession';

class ProfessionService {
  async getProfessions() {
    logR('warn', 'AuthService: Refresh Token');
    // const response = await decorateResponseApi(ApiProfession.getProfessions);
    const response = await ApiProfession.getProfessions();
    return response;
  }
}

export default new ProfessionService();
