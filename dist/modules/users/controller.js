"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const validate_1 = require("../users/validate");
const actions_1 = require("../../utils/actions");
const server_1 = require("../../main/server");
const lodash_1 = require("lodash");
const model_1 = __importDefault(require("../users/model"));
const validate_2 = __importDefault(require("../../utils/validate"));
exports.default = () => {
    server_1.io.of('/auth').on('connection', socket => {
        const validation = (0, validate_2.default)(socket);
        //Login
        socket.on('login', async (form) => {
            const action = async (values) => {
                const credential = { email: values.email };
                const isUser = await model_1.default.findOne(credential).select('+password');
                const msg = options_1.messages.login;
                if (!(0, lodash_1.isEmpty)(isUser))
                    if (await isUser.passwordCompare(values.password)) {
                        const session = await (0, options_1.createSession)(credential, isUser._id);
                        socket.emit('login/success', msg.success(session));
                    }
                    else
                        socket.emit('login/error', msg.password);
                else
                    socket.emit('login/error', msg.userNotFount);
                socket.disconnect(true);
            };
            await validation(form, validate_1.rules.login, action);
        });
        //Register
        socket.on('register', async (form) => {
            const action = async (values) => {
                const msg = options_1.messages.register;
                if (!(await model_1.default.exists({ email: values.email }))) {
                    let user = await model_1.default.create(values);
                    user = (0, actions_1.removeProperty)(user, 'password');
                    if (!(0, lodash_1.isEmpty)(user))
                        socket.emit('register/success', msg.success);
                    else
                        socket.emit('register/error', msg.notCreated);
                }
                else
                    socket.emit('register/error', msg.email);
                socket.disconnect(true);
            };
            await validation(form, validate_1.rules.register, action);
        });
        //Status
        socket.on('status', async (token) => {
            const msg = options_1.messages.status;
            if (!(0, lodash_1.isEmpty)(token)) {
                const isUser = (0, options_1.getEmailJwt)(token);
                if (!(0, lodash_1.isEmpty)(isUser)) {
                    const user = await model_1.default.findOne({ email: isUser.email });
                    socket.emit('status/response', msg.success(user));
                }
                else
                    socket.emit('status/response', msg.error);
            }
            else
                socket.emit('status/response', msg.error);
        });
        //Logout
        socket.on('logout', async (token) => {
            const msg = options_1.messages.logout;
            const isUser = (0, options_1.getEmailJwt)(token);
            if (!(0, lodash_1.isEmpty)(isUser)) {
                let user = await model_1.default.findOne({ email: isUser.email });
                let isUpdate = (0, options_1.removeSession)(user, token);
                if (isUpdate)
                    socket.emit('logout/success', msg.success);
                else
                    socket.emit('logout/error', msg.error);
            }
            else
                socket.emit('logout/error', msg.error);
        });
    });
};
