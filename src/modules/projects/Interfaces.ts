import { Document } from "mongoose";

export interface ProjectI extends Document {
	description: string;
	createdAt?: string;
	updatedAt?: string;
	_autor: string;
	title: string;
	_id?: string;
}
