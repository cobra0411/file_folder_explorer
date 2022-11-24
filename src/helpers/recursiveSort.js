export const recursiveSort = (data) => {
  data.sort((obj1, obj2) => {
    if (obj1.isFolder && !obj2.isFolder) {
      return false;
    } else if (
      (obj1.isFolder && obj2.isFolder) ||
      (!obj1.isFolder && !obj2.isFolder)
    ) {
      return obj1.name > obj2.name;
    } else if (!obj1.isFolder && obj2.isFolder) {
      return true;
    }
    return true;
  });
  for (let obj of data) {
    recursiveSort(obj.data);
  }
};
