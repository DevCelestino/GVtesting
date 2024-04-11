var globalEnv = {
  APP_URL: 'http://localhost:3000/',
  PATH_TESTES: '/tests'
}

if (globalEnv.APP_URL.endsWith('/')) {
  globalEnv.APP_URL = globalEnv.APP_URL.substring(0, globalEnv.APP_URL.length - 1);
}

module.exports = { globalEnv };
