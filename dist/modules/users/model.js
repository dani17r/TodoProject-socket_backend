"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../utils/auth");
const paginate_1 = require("../../utils/paginate");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    password: {
        required: true,
        select: false,
        type: String,
        trim: true
    },
    email: {
        lowercase: true,
        required: true,
        unique: true,
        type: String,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    sessions: [
        {
            status: Boolean,
            token: String,
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
    strictQuery: false,
    query: {
        paginate: (paginate_1.paginate)
    }
});
(0, auth_1.validateEmail)(UserSchema, "Users");
(0, auth_1.passwordOptions)(UserSchema);
exports.default = (0, mongoose_1.model)("Users", UserSchema);
