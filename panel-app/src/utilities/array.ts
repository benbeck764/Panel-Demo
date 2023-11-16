export const arrayMinMax = (arr: Array<number>): [number, number] => {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val < min) {
      min = val;
    }
    if (val > max) {
      max = val;
    }
  }

  return [min, max];
};
