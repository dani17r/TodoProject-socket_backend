import { ProjectI } from "@modules/projects/Interfaces";
import { ModelType } from "@modules/interfaces";
import { paginate } from "@utils/paginate";
import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
	{
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
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{
		timestamps: true,
		versionKey: false,
		strictQuery: false,
		query: {
			paginate: paginate<ProjectI>,
		},
	},
);

export default model<ProjectI, ModelType<ProjectI>>("Projects", ProjectSchema);
