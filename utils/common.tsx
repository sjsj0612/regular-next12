export const sortByValueAsc = (array:any) => {
    array.sort(function (a:any, b:any) {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });
    return array
}
  
export const sortByValueDesc = (array:any, value: string) => {
    array.sort(function (a:any, b:any) {
      if (a[value] > b[value]) {
        return -1;
      }
      if (a[value] < b[value]) {
        return 1;
      }
      return 0;
    });
    return array
}