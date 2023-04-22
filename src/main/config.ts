const env = process.env;
const BASE = `${env.HOST}:${Number(env.PORT)}/` ?? "http://localhost:8000/";
const BASE_FRONTEND = `${env.URL_FRONTEND}` ?? "http://localhost:3000/";

export default {
	NODE_ENV: env.NODE_ENV ?? "development",

	TIME: Number(env.TIME) ?? 60 * 60 * 24 * 3, // 3 dias
	HOST: `${env.HOST}/` ?? "127.0.0.1/",
	PORT: Number(env.PORT) ?? 7700,
	URL_BASE: BASE,

	SECRET: env.SECRET_PRIMARY ?? "@mecretPrivadKeyP094@",

	DB_NAME: env.MONGO_DB_NAME ?? "dev_db",
	DB_URI: env.MONGO_URI ?? "mongodb://127.0.0.1:27017/",

	URL_FRONTEND: BASE_FRONTEND,

	MONGO_OPTIONS: {
		keepAlive: true,
		keepAliveInitialDelay: 300000,
	},
	CORS: {
		origin: BASE_FRONTEND,
		credentials: false,
	},
	SOKET_IO: {
		cors: {
			origin: BASE_FRONTEND,
			// credentials: true,
		},
	},
};
