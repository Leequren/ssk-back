declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_KET: string;
      DATABASE_URL: string;
    }
  }
}
export {};
