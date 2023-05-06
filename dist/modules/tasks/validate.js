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
    created: joi_1.default.object().keys({
        name: str_length(3, 30, str()),
        description: joi_1.default.allow(null),
        type: str().required(),
    }),
    updated: joi_1.default.object().keys({
        name: str_length(3, 30, str()),
        description: joi_1.default.allow(null),
        type: str().required(),
    }),
};
