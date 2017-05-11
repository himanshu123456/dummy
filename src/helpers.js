export const find = function(arr, field, eq) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][field] == eq)
      return i;
  }
  return -1;
}
