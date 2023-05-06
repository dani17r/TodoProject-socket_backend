"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { rules } from "../projects/validate";
const model_1 = __importDefault(require("../projects/model"));
const server_1 = require("../../main/server");
const querys_1 = require("../../utils/querys");
const mongoose_1 = require("mongoose");
const getAll = async (query, _autor) => {
    const search = (0, querys_1.getSearchQuery)(query);
    const pag = (0, querys_1.getPaginateQuery)(query);
    const fields = (0, querys_1.getFieldQuery)(query);
    const order = (0, querys_1.getFieldSort)(query);
    return await model_1.default.find({ ...search, _autor }, fields)
        .sort(order)
        .paginate(pag);
};
exports.default = () => {
    server_1.io.of("/project").on("connection", (socket) => {
        let userId = socket.handshake.headers["user"];
        socket.on("create", async ({ form, query }) => {
            const isInsert = await model_1.default.findOneAndUpdate({ title: form.title }, {
                $setOnInsert: { ...form, _autor: new mongoose_1.Types.ObjectId(form._autor) },
            }, { upsert: true }).then((doc) => doc == null);
            if (isInsert) {
                getAll(query, form._autor).then((projects) => {
                    socket.broadcast.timeout(8000).emit(`broadcast:${userId}/create`);
                    socket.emit("create/success", projects);
                });
            }
            else
                socket.emit("create/error", {
                    message: `A project with this name already exists`,
                    field: "title",
                });
        });
        socket.on("update", async (form) => {
            const newProject = await model_1.default.findOneAndUpdate({ _id: form._id }, { $set: form }, { returnOriginal: false });
            if (newProject) {
                socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
                socket.emit("update/success", newProject);
            }
            else
                socket.emit("update/error", {
                    message: `Could not update project`,
                    field: "title",
                });
        });
        socket.on("delete", async ({ _id, _autor, query }) => {
            await model_1.default.findByIdAndDelete(_id);
            const isDelete = model_1.default.findById(_id).then((doc) => doc == null);
            if (isDelete) {
                getAll(query, _autor).then((projects) => {
                    socket.emit("delete/success", projects);
                    socket.broadcast
                        .timeout(8000)
                        .emit(`broadcast:${userId}/delete`, { _id, projects });
                });
            }
            else
                socket.emit("delete/error", {
                    message: `Could not delete`,
                });
        });
        socket.on("all", async ({ query, _autor }) => {
            getAll(query, _autor).then((projects) => {
                socket.emit("all/success", projects);
            });
        });
        //Verify Id
        socket.on("verify-id", async (_id) => {
            const user = await model_1.default.findById(_id).catch(() => false);
            if (user)
                socket.emit("verify-id", true);
            else
                socket.emit("verify-id", false);
        });
    });
};
