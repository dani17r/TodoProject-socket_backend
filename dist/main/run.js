"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../modules/projects/controller"));
const controller_2 = __importDefault(require("../modules/users/controller"));
const controller_3 = __importDefault(require("../modules/tasks/controller"));
exports.default = () => {
    (0, controller_2.default)();
    (0, controller_1.default)();
    (0, controller_3.default)();
};
