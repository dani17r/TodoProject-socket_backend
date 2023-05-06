"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const joi_1 = __importDefault(require("joi"));
const str = () => joi_1.default.string().trim().lowercase();
const str_length = (min, max, joi) => joi.min(min).max(max);
exports.rules = {
    login: joi_1.default.object().keys({
        password: str_length(8, 16, str()).required(),
        email: str().email().required(),
    }),
    register: joi_1.default.object().keys({
        password: str_length(8, 16, str()).required(),
        email: str().email().required(),
        fullname: str().required(),
    }),
};
