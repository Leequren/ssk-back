declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_PORT: string;
      DATABASE_URL: string;
      JWT_KEY: string;
    }
  }
}
export {};
