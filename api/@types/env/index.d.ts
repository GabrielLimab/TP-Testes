declare namespace NodeJS {
  interface ProcessEnv {
      APP_URL_ADDRESS: string | undefined;
      APP_URL_LOCALHOST: string | undefined;
      PORT: string | undefined;
      DATABASE_URL: string | undefined;
      SECRET_KEY: string | undefined;
      JWT_EXPIRATION: string | undefined;
      NODE_ENV: string | undefined;
  }
}