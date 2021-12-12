export const sortObject = (o: any) =>
  Object.keys(o)
    .sort()
    .reduce((r: any, k) => ((r[k] = o[k]), r), {});
