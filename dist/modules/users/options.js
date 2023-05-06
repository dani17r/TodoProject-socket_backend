"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.removeSession = exports.createSession = exports.getEmailJwt = void 0;
const model_1 = __importDefault(require("../users/model"));
const config_1 = __importDefault(require("../../main/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const getEmailJwt = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.SECRET, (val, data) => val ? {} : data);
};
exports.getEmailJwt = getEmailJwt;
const createSession = async (credential, _id) => {
    const time = { expiresIn: config_1.default.TIME };
    const token = jsonwebtoken_1.default.sign(credential, config_1.default.SECRET, time);
    const session = {
        start: new Date().getTime(),
        token
    };
    let user = await model_1.default.findOneAndUpdate({ _id }, { $push: { sessions: session } }, { returnOriginal: false });
    user.sessions = undefined;
    return { user, token };
};
exports.createSession = createSession;
const removeSession = async (user, token) => {
    (0, lodash_1.remove)(user.sessions, session => session.token == token);
    const isUpdate = await model_1.default.findOneAndUpdate({ email: user.email }, { $set: { sessions: user.sessions } }, { returnOriginal: false });
    return isUpdate;
};
exports.removeSession = removeSession;
exports.messages = {
    login: {
        success: (session) => ({
            notify: {
                message: 'login success',
                field: 'notify'
            },
            token: session.token,
            user: session.user
        }),
        password: {
            message: 'Incorrect password',
            field: 'password'
        },
        userNotFount: {
            message: 'There is no user with this email',
            field: 'email'
        }
    },
    register: {
        email: {
            message: 'Email is already in use',
            field: 'email'
        },
        success: {
            notify: {
                message: 'User successfully registered',
                field: 'notify'
            }
        },
        notCreated: {
            message: 'Error creating a user',
            field: 'notify'
        }
    },
    status: {
        success: (user) => ({ user, isSession: true }),
        error: { user: null, isSession: false }
    },
    logout: {
        success: {
            notify: {
                message: 'Logout successful',
                field: 'notify'
            }
        },
        error: {
            message: 'The session could not be closed',
            field: 'notify'
        }
    }
};
