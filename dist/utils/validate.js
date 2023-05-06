"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket) => {
    const validation = async (data, rule, action) => {
        const { error, value } = rule.validate(data);
        if (error != (null || undefined)) {
            socket.emit('login/error', {
                field: error.details.map((d) => d.context.label)[0],
                message: error.details.map((d) => d.message.replace(/\"/g, ''))[0]
            });
        }
        else
            await action(value);
    };
    return validation;
};
