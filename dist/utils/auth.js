"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.autoPopulate = exports.passwordOptions = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const mongoose_1 = require("mongoose");
const passwordOptions = function (SchemaBase) {
    SchemaBase.pre("save", async function () {
        const salt = await (0, bcrypt_1.genSalt)(10);
        this.password = (0, bcrypt_1.hashSync)(this.password, salt);
    });
    SchemaBase.methods.passwordCompare = async function (password) {
        return (0, bcrypt_1.compareSync)(password, this.password);
    };
};
exports.passwordOptions = passwordOptions;
const autoPopulate = function (SchemaBase) {
    SchemaBase.plugin(mongoose_autopopulate_1.default);
};
exports.autoPopulate = autoPopulate;
const validateEmail = function (SchemaBase, name) {
    const valid = async (email) => {
        let isEmail = await mongoose_1.models[name].countDocuments({ email });
        return !isEmail;
    };
    SchemaBase.path("email").validate(valid, "Email already exits");
};
exports.validateEmail = validateEmail;
