import { ModelQuery, PaginateParamsT } from "@modules/interfaces";

const countPage = (count: number, limit: number): number => {
  if (count >= limit) return Math.ceil(count / limit);
  return 1;
};

export const Pag = (paginate: any) => {
  const LIMIT = parseInt(paginate.limit) || 10;
  const PAG = parseInt(paginate.pag) || 1;

  const skip = () => {
    if (PAG == 1 || 0) return 0;
    else return PAG * LIMIT - LIMIT;
  };

  return { LIMIT, PAG, skip };
};

export const paginate = async function <T>(
  this: ModelQuery<T>,
  pag: PaginateParamsT
) {
  let COUNT = 0;
  await this.clone()
    .countDocuments()
    .then((count: number) => (COUNT = count));

  const { skip, LIMIT, PAG } = Pag(pag);
  return await this.skip(skip())
    .limit(LIMIT)
    .then((data: any) => {
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
