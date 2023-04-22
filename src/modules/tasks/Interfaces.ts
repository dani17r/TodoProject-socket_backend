import { Document } from "mongoose";

export interface TaskI extends Document {
	createdAt?: string;
	updatedAt?: string;
	_project: string;
	select?: boolean;
	content?: string;
	position: number;
	trash?: boolean;
	_autor: string;
	done?: boolean;
	name: string;
	_id?: string;
}
