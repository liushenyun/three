import apiUrl from '../../apiConfig';

let baseUrl = '';
let env = process.env.NODE_ENV;
console.log('process', process);

switch (env) {
  case 'development':
    baseUrl = '/dtapi/';
    break;
  case 'production':
    baseUrl = apiUrl.httpUrl;
    break;
}

export {
  baseUrl
};
