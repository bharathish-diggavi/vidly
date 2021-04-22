import _ from "lodash";
export const paginate = (items, pageSize, pageNumber) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize;
  return _.slice(items, startIndex, endIndex);
};
