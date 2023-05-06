"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProperty = void 0;
const removeProperty = (data, field) => {
    return data[field] = undefined;
};
exports.removeProperty = removeProperty;
