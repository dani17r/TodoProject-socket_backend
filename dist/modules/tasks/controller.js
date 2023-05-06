"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { rules } from "../tasks/validate";
const model_1 = __importDefault(require("../tasks/model"));
const server_1 = require("../../main/server");
const querys_1 = require("../../utils/querys");
const mongoose_1 = require("mongoose");
const getAll = async (query, _project) => {
    const search = (0, querys_1.getSearchQuery)(query);
    const fields = (0, querys_1.getFieldQuery)(query);
    const order = (0, querys_1.getFieldSort)(query);
    const data = await model_1.default.find({ ...search, _project, trash: false }, fields).sort(order);
    const trash = await model_1.default.find({ _project, trash: true }).sort({
        updatedAt: "desc",
    });
    return { data, trash };
};
exports.default = () => {
    server_1.io.of("/task").on("connection", (socket) => {
        let userId = socket.handshake.headers["user"];
        socket.on("create", async ({ form, query }) => {
            const isInsert = await model_1.default.create({
                ...form,
                _autor: new mongoose_1.Types.ObjectId(form._autor),
                _project: new mongoose_1.Types.ObjectId(form._project),
            });
            if (isInsert) {
                getAll(query, form._project).then((tasks) => {
                    socket.broadcast.timeout(8000).emit(`broadcast:${userId}/create`);
                    socket.emit("create/success", tasks);
                });
            }
            else
                socket.emit("create/error", {
                    message: `A task with this name already exists`,
                    field: "title",
                });
        });
        socket.on("update", async (form) => {
            const newTask = await model_1.default.findOneAndUpdate({ _id: form._id }, { $set: form }, { returnOriginal: false });
            if (newTask) {
                socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
                socket.emit("update/success", newTask);
            }
            else
                socket.emit("update/error", {
                    message: `Failed to update task`,
                    field: "title",
                });
        });
        socket.on("change-position", async (newPositions) => {
            let successTasks = [];
            for (let position of newPositions) {
                const update = await model_1.default.updateOne({ _id: position._id }, { $set: position });
                successTasks.push(update);
            }
            if (successTasks.length) {
                socket.broadcast
                    .timeout(8000)
                    .emit(`broadcast:${userId}/change-position`);
                socket.emit("change-position/success", "success");
            }
            else
                socket.emit("change-position/error", {
                    message: `Task positions have not been updated`,
                });
        });
        socket.on("trash", async ({ _ids, _project, query }) => {
            const update = await model_1.default.updateMany({ _id: { $in: _ids } }, { $set: { trash: true } });
            if (Number(update?.modifiedCount) > 0) {
                getAll(query, _project).then((tasks) => {
                    socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
                    socket.emit("trash/success", tasks);
                });
            }
            else
                socket.emit("trash/error", {
                    message: `Could not move to trash`,
                    field: "notify",
                });
        });
        socket.on("delete", async ({ _id, _project, query }) => {
            await model_1.default.findByIdAndDelete(_id);
            const isDelete = model_1.default.findById(_id).then((doc) => doc == null);
            if (isDelete) {
                getAll(query, _project).then((tasks) => {
                    socket.emit("delete/success", tasks);
                    socket.broadcast
                        .timeout(8000)
                        .emit(`broadcast:${userId}/delete`, { _id, tasks });
                });
            }
            else
                socket.emit("delete/error", {
                    message: `could not delete`,
                });
        });
        socket.on("delete-all", async ({ _project, query }) => {
            const isDelete = await model_1.default.deleteMany({ _project, trash: true });
            if (isDelete) {
                getAll(query, _project).then((tasks) => {
                    socket.broadcast.timeout(8000).emit(`broadcast:${userId}/delete-all`);
                    socket.emit("delete-all/success", tasks);
                });
            }
            else
                socket.emit("delete-all/error", {
                    message: `could not delete`,
                });
        });
        socket.on("all", async ({ query, _project }) => {
            if (_project) {
                getAll(query, _project).then((tasks) => {
                    socket.emit("all/success", tasks);
                });
            }
        });
    });
};
