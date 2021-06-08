const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

require('dotenv').config();

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  env: {
    JWT_USER: process.env.JWT_USER,
    JWT_PWD: process.env.JWT_PWD,
    BASE_URL: process.env.BASE_URL,
    REST_PATH: process.env.REST_PATH,
    REST_ACF: process.env.REST_ACF,
    API_URL: process.env.GRAPHQL_URL,
    AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
    JWT_TOKEN: process.env.JWT_TOKEN,
    PREVIEW_PASS: process.env.PREVIEW_PASS
  }
  // experimental: {
  //   amp: {
  //     skipValidation: true,
  //   },
  // },
});

// require('dotenv').config();

// module.exports = {
//   env: {
//     JWT_USER: process.env.JWT_USER,
//     JWT_PWD: process.env.JWT_PWD,
//     BASE_URL: process.env.BASE_URL,
//     REST_PATH: process.env.REST_PATH,
//     REST_ACF: process.env.REST_ACF,
//     API_URL: process.env.GRAPHQL_URL,
//     AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
//     JWT_TOKEN: process.env.JWT_TOKEN,
//     PREVIEW_PASS: process.env.PREVIEW_PASS
//   }
//   // experimental: {
//   //   amp: {
//   //     skipValidation: true,
//   //   },
//   // },
// };
