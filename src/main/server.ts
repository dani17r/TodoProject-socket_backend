//Importaciones Externas
import { createServer } from "http";
import { Server } from "socket.io";
import koa from "koa";

//Importaciones Internas
import { connectDB } from "@main/database";
import config from "@main/config";
import run from "@main/run";

//init
const app = new koa();

// Connection
connectDB();

const http = createServer(app.callback());
const io = new Server(http, config.SOKET_IO);

run();

//export default
export { http, app, io };
