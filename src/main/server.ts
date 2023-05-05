//Importaciones Externas
import { createServer } from "http";
import { Server } from "socket.io";
import koa from "koa";

//Importaciones Internas
import { connectDB } from "@main/database";
import config from "@main/config";
import { readFile } from "node:fs/promises";
var serve = require("koa-static");
import run from "@main/run";
import path from "path";

//init
const app = new koa();

app.use(serve("./public"));

app.use(async (ctx) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile("./public/index.html");
});

// Connection
connectDB();

const http = createServer(app.callback());
const io = new Server(http, config.SOKET_IO);

run();

//export default
export { http, app, io };
