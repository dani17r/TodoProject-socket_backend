import { connection, disconnect, connect, Connection } from "mongoose";
import config from "@main/config";

const uri_db = () => String(config.DB_URI);

export const DB: Connection = connection;

export const connectDB = (): void => {
  if (uri_db()) connect(uri_db(), config.MONGO_OPTIONS);
  else console.error(`No hay url de conexion a la db de mongo.`);
};

export const closeDB = () => disconnect();

DB.on("error", console.error.bind(console, "MongoDB connection error:"));
