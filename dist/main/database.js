"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = exports.DB = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config"));
const uri_db = () => String(config_1.default.DB_URI);
exports.DB = mongoose_1.connection;
const connectDB = () => {
    if (uri_db())
        (0, mongoose_1.connect)(uri_db(), config_1.default.MONGO_OPTIONS);
    else
        console.error(`No hay url de conexion a la db de mongo.`);
};
exports.connectDB = connectDB;
const closeDB = () => (0, mongoose_1.disconnect)();
exports.closeDB = closeDB;
exports.DB.on("error", console.error.bind(console, "MongoDB connection error:"));
