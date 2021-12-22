export const composeMixins =
  (...mixins) =>
  (superclass) =>
    mixins.reduce((acc, curr) => curr(acc), superclass);
