"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = exports.http = void 0;
//Importaciones Externas
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const koa_1 = __importDefault(require("koa"));
//Importaciones Internas
const database_1 = require("./database");
const config_1 = __importDefault(require("./config"));
const promises_1 = require("node:fs/promises");
var serve = require("koa-static");
const run_1 = __importDefault(require("./run"));
//init
const app = new koa_1.default();
exports.app = app;
app.use(serve("./public"));
app.use(async (ctx) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = await (0, promises_1.readFile)("./public/index.html");
});
// Connection
(0, database_1.connectDB)();
const http = (0, http_1.createServer)(app.callback());
exports.http = http;
const io = new socket_io_1.Server(http, config_1.default.SOKET_IO);
exports.io = io;
(0, run_1.default)();
