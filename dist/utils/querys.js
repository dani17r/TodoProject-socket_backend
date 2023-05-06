"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchQuery = exports.getPaginateQuery = exports.getFieldSort = exports.getFieldQuery = void 0;
const removeSpaces = (val) => val?.replace(/\s+/g, "");
const getFieldQuery = (query) => {
    const fields = query.fields ? String(query.fields) : "";
    const without = query.without ? 0 : 1;
    if (fields) {
        const arr = removeSpaces(fields).split(",");
        return arr.reduce((target, key) => {
            target[key.trim()] = without;
            return target;
        }, {});
    }
    else
        return {};
};
exports.getFieldQuery = getFieldQuery;
const getFieldSort = (query) => {
    const { sort } = query;
    const sortQuery = sort ? String(sort) : "none:asc";
    const [field, value] = removeSpaces(sortQuery).split(":");
    return { [field]: value };
};
exports.getFieldSort = getFieldSort;
const getPaginateQuery = (query) => {
    const limit = Number(query.limit);
    const pag = Number(query.pag);
    return { limit, pag };
};
exports.getPaginateQuery = getPaginateQuery;
const getSearchQuery = (query) => {
    const { search, fields_search } = query;
    if (search?.length && fields_search?.length) {
        const fields = removeSpaces(fields_search).split(",");
        return {
            $or: fields.map((field) => {
                return {
                    [field]: { $regex: search, $options: "i" },
                };
            }),
        };
    }
    else
        return {};
};
exports.getSearchQuery = getSearchQuery;
