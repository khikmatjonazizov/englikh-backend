export const endpoints = {
  auth: {
    root: 'auth',
    endpoints: {
      login: 'login',
      signup: 'signup',
    },
  },
  users: {
    root: 'users',
    endpoints: {
      list: '',
      one: ':id',
    },
  },
};
