var globalEnv = {
  API_URL: 'http://localhost:5000/'
}

if (globalEnv.API_URL.endsWith("/")) {
  globalEnv.API_URL = globalEnv.API_URL.substring(0, globalEnv.API_URL.length - 1);
}

export default globalEnv;
