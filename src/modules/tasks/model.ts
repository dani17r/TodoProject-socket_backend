import { TaskI } from "@modules/tasks/Interfaces";
import { ModelType } from "@modules/interfaces";
import { paginate } from "@utils/paginate";
import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
	{
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
			type: Schema.Types.ObjectId,
			ref: "Projects",
		},
		_autor: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{
		timestamps: true,
		versionKey: false,
		strictQuery: false,
		query: {
			paginate: paginate<TaskI>,
		},
	},
);

export default model<TaskI, ModelType<TaskI>>("Tasks", TaskSchema);
