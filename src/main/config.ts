const env = process.env;
const BASE = `${env.HOST}/` ?? "http://localhost:8000/";
const FRONTEND = `${env.FRONTEND}` ?? "http://localhost:3000/";

export default {
  PORT: Number(env.PORT) ?? 8080,
  TIME: Number(env.TIME) ?? 60 * 60 * 24 * 3, // 3 dias
  HOST: `${env.HOST}/` ?? "127.0.0.1/",
  URL_BASE: BASE,

  SECRET: env.SECRET_PRIMARY ?? "@mecretPrivadKeyP094@",

  DB_URI:
    env.MONGO_URI ??
    "mongodb://127.0.0.1:27017/taskList?directConnection=true&retryWrites=true&w=majority",

  URL_FRONTEND: FRONTEND,

  MONGO_OPTIONS: {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  },
  CORS: {
    origin: FRONTEND,
    credential: false,
  },
  SOKET_IO: {
    cors: {
      origin: FRONTEND,
      // credentials: true,
    },
  },
};
