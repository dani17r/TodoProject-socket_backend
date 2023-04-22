import { HydratedDocument, QueryWithHelpers, SortOrder, Schema, Model } from "mongoose";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";

export type FieldsWithout = {
	without: Number | Boolean;
	fields: string;
};

export type FieldSortT = { [key: string]: SortOrder };
export type ArraySortT = [string, SortOrder];

export type PaginateParamsT = {
	limit: number;
	pag: number;
};

export type ModelQuery<T> = QueryWithHelpers<T, HydratedDocument<T>, HydratedDocument<T>[]>;

export interface PaginateI<T> {
	paginate(paginate?: PaginateParamsT): ModelQuery<T>;
}

export type ModelType<T> = Model<T, PaginateI<T>>;

export type ModelSchema<T> = Schema<T, ModelType<T>, {}, PaginateI<T>>;

export type SocketT = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export interface QueryI {
	fields_search: string;
	without: string;
	search: string;
	fields: string;
	limit: string;
	sort: string;
	pag: string;
}
