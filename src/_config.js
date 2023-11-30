// import 'dotenv/config';
export const isDevelop = true;
export const urlApi = 'http://94.241.169.172:8081/api/';
export const tabsByRole = {
  admin: [
    {id: 0, title: 'К историям', lock: false, url: '/stories'},
    {
      id: 0,
      title: 'Панель администратора',
      lock: false,
      url: '/admin',
    },
    {
      id: 1,
      title: 'Редактирование таблиц',
      lock: false,
      url: '/database',
    },
  ],
  user: [{id: 0, title: 'К историям', lock: false, url: '/stories'}],
};