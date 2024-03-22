export const Environment = {
  API_URL:
    globalEnv.API_URL.endsWith("/")
      ? globalEnv.API_URL.substring(0, globalEnv.API_URL.length - 1)
      : globalEnv.API_URL,
};
