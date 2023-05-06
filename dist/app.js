"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = __importDefault(require("./main/config"));
const server_1 = require("./main/server");
server_1.http.listen(config_1.default.PORT, async () => {
    console.log(`When it's ${new Date().toLocaleString()}`);
    console.log(`⚡ on ${config_1.default.URL_BASE}`);
});
