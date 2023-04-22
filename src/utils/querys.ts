import {
	PaginateParamsT,
	FieldsWithout,
	ArraySortT,
	FieldSortT,
	QueryI,
} from "@modules/interfaces";

const removeSpaces = (val: string) => val?.replace(/\s+/g, "");

export const getFieldQuery = (query: QueryI): FieldsWithout | { [key: string]: number } => {
	const fields = query.fields ? String(query.fields) : "";
	const without = query.without ? 0 : 1;

	if (fields) {
		const arr = removeSpaces(fields).split(",");
		return arr.reduce((target: { [key: string]: number }, key) => {
			target[key.trim()] = without;
			return target;
		}, {});
	} else return {};
};

export const getFieldSort = (query: QueryI): FieldSortT => {
	const { sort } = query;
	const sortQuery = sort ? String(sort) : "none:asc";
	const [field, value] = removeSpaces(sortQuery).split(":") as ArraySortT;
	return { [field]: value };
};

export const getPaginateQuery = (query: QueryI): PaginateParamsT => {
	const limit = Number(query.limit);
	const pag = Number(query.pag);

	return { limit, pag };
};

export const getSearchQuery = (query: QueryI) => {
	const { search, fields_search } = query;

	if (search?.length && fields_search?.length) {
		const fields = removeSpaces(fields_search).split(",");
		return {
			$or: fields.map((field: string) => {
				return {
					[field]: { $regex: search, $options: "i" },
				};
			}),
		};
	} else return {};
};
