import faker from 'faker';

// export function repeat(fn: () => any, number: number) {
//   let arr = [];

//   for (let i = 0; i < number; i++) {
//     arr.push(fn());
//   }

//   return arr;
// }

export function repeat(fn: () => void, number = faker.datatype.number({ min: 1, max: 50 })) {
  // create an array with a random number (between 1 and 50) of elements
  const arr = new Array(number).fill(undefined);
  return arr.map(() => fn());
}

export interface IPageQuery {
  offset: number;
  limit: number;
  sortString?: string; // name desc|asc
  filterString?: string; // (name==*s*;enabled==false)
}

export function pageData(data: any[], pageQuery?: IPageQuery) {
  const limit = +pageQuery.limit;
  const offset = +pageQuery.offset;

  return {
    items: data.slice(offset, offset + limit),
    pageInfo: {
      total: data.length,
      offset,
      limit,
    },
  };
}
