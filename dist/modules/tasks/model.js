"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("../../utils/paginate");
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        default: "",
        trim: true,
    },
    select: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number,
        require: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    trash: {
        type: Boolean,
        default: false,
    },
    _project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Projects",
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
exports.default = (0, mongoose_1.model)("Tasks", TaskSchema);
