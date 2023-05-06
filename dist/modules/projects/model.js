"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("../../utils/paginate");
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    _autor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
    versionKey: false,
    strictQuery: false,
    query: {
        paginate: (paginate_1.paginate),
    },
});
exports.default = (0, mongoose_1.model)("Projects", ProjectSchema);
