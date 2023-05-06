"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.Pag = void 0;
const countPage = (count, limit) => {
    if (count >= limit)
        return Math.ceil(count / limit);
    return 1;
};
const Pag = (paginate) => {
    const LIMIT = parseInt(paginate.limit) || 10;
    const PAG = parseInt(paginate.pag) || 1;
    const skip = () => {
        if (PAG == 1 || 0)
            return 0;
        else
            return PAG * LIMIT - LIMIT;
    };
    return { LIMIT, PAG, skip };
};
exports.Pag = Pag;
const paginate = async function (pag) {
    let COUNT = 0;
    await this.clone()
        .countDocuments()
        .then((count) => (COUNT = count));
    const { skip, LIMIT, PAG } = (0, exports.Pag)(pag);
    return await this.skip(skip())
        .limit(LIMIT)
        .then((data) => {
        let totalPage = countPage(COUNT, LIMIT);
        return {
            paginate: {
                totalPaginate: data.length,
                totalPag: totalPage,
                currentPag: PAG,
                total: COUNT,
                limit: LIMIT,
            },
            data,
        };
    });
};
exports.paginate = paginate;
