import TokenService from './token.service';

import {isDevelop} from '@/_config';
export function logR(type, msg) {
  // INFO: зато забавно
  if (isDevelop) {
    if (type == 'log') {
      console.log(msg);
    } else if (type == 'warn') {
      console.warn(msg);
    } else if (type == 'error') {
      console.error(msg);
    }
  }
}

export const decorateResponseApi = async function (func, context) {
  // let response = {status: 404, data: null, message: ''};
  const token = TokenService.getLocalAccessToken();
  console.log('token\n', token);
  const config = {headers: {Authorization: token}};
  const response = await func(context, config).catch((resp) => {
    console.error('DECORATE RESPONSE API\n', resp);
    if (resp.status) {
      return {status: resp.status};
    } else {
      return {status: resp.response.status};
    }
  });
  if (response.status != 200) {
    return {status: response.status, data: null};
  }
  // if (responseWrap.status == 200) {
  //   response.status = responseWrap.status;
  //   response.data = responseWrap.data;
  //   return response;
  // }
  return response;
};

export const extractJWT = function (token) {
  logR('warn', 'Service.Utils: ExtractJWT');
  console.log('TOKEN', token);
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export const isValidExpireTimeFromJWT = function (userData) {
  const expTime = userData.exp * 1000;
  const currentDateTime = new Date();
  const differenceTime = expTime - currentDateTime;
  console.warn(`DIFFERENCE TIME ${differenceTime}`);
  if (differenceTime <= 1000) {
    return false;
  }
  return true;
};

export const decorateResponseDataArray = function (response) {
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};
