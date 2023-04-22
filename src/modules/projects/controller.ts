import { ProjectI } from "@modules/projects/Interfaces";
// import { rules } from "@modules/projects/validate";
import Projects from "@modules/projects/model";
import { io } from "@main/server";

import {
  getPaginateQuery,
  getSearchQuery,
  getFieldQuery,
  getFieldSort,
} from "@utils/querys";
import { QueryI } from "@modules/interfaces";
import { Types } from "mongoose";

interface AllDataI {
  query: QueryI;
  _autor: string;
}

interface DeleteProject {
  _id: string;
  _autor: string;
  query: QueryI;
}

const getAll = async (query: QueryI, _autor: string) => {
  const search = getSearchQuery(query);
  const pag = getPaginateQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  return await Projects.find({ ...search, _autor }, fields)
    .sort(order)
    .paginate(pag);
};

export default () => {
  io.of("/project").on("connection", (socket) => {
    let userId = socket.handshake.headers["user"];

    socket.on(
      "create",
      async ({ form, query }: { form: ProjectI; query: QueryI }) => {
        const isInsert = await Projects.findOneAndUpdate(
          { title: form.title },
          {
            $setOnInsert: { ...form, _autor: new Types.ObjectId(form._autor) },
          },
          { upsert: true }
        ).then((doc) => doc == null);

        if (isInsert) {
          getAll(query, form._autor).then((projects) => {
            socket.broadcast.timeout(8000).emit(`broadcast:${userId}/create`);
            socket.emit("create/success", projects);
          });
        } else
          socket.emit("create/error", {
            message: `A project with this name already exists`,
            field: "title",
          });
      }
    );

    socket.on("update", async (form: ProjectI) => {
      const newProject = await Projects.findOneAndUpdate(
        { _id: form._id },
        { $set: form },
        { returnOriginal: false }
      );

      if (newProject) {
        socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
        socket.emit("update/success", newProject);
      } else
        socket.emit("update/error", {
          message: `Could not update project`,
          field: "title",
        });
    });

    socket.on("delete", async ({ _id, _autor, query }: DeleteProject) => {
      await Projects.findByIdAndDelete(_id);
      const isDelete = Projects.findById(_id).then((doc) => doc == null);

      if (isDelete) {
        getAll(query, _autor).then((projects) => {
          socket.emit("delete/success", projects);
          socket.broadcast
            .timeout(8000)
            .emit(`broadcast:${userId}/delete`, { _id, projects });
        });
      } else
        socket.emit("delete/error", {
          message: `Could not delete`,
        });
    });

    socket.on("all", async ({ query, _autor }: AllDataI) => {
      getAll(query, _autor).then((projects) => {
        socket.emit("all/success", projects);
      });
    });

    //Verify Id
    socket.on("verify-id", async (_id: string) => {
      const user = await Projects.findById(_id).catch(() => false);

      if (user) socket.emit("verify-id", true);
      else socket.emit("verify-id", false);
    });
  });
};
