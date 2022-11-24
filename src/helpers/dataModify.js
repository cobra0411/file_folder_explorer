export const insertData = (currentItem, parentKey, value, isFolder) => {
  if (currentItem.id === parentKey) {
    const newItem = {
      name: value,
      id: new Date().getTime(),
      isFolder: isFolder,
      data: []
    };
    console.log("setting new datatttt", currentItem.id);
    currentItem.data.push(newItem);
    return;
  } else {
    for (let item of currentItem.data) {
      insertData(item, parentKey, value, isFolder);
    }
  }
};

export const updateData = (currentItem, parentKey, value) => {
  if (currentItem.id === parentKey) {
    currentItem.name = value;
    return;
  } else {
    for (let item of currentItem.data) {
      updateData(item, parentKey, value);
    }
  }
};
export const deleteData = (currentItem, parentKey) => {
  if (currentItem.id === parentKey) {
    currentItem = null;
    return null;
  } else {
    const tempData = currentItem.data;
    const newData = [];
    for (let item of tempData) {
      const temp = deleteData(item, parentKey);
      console.log("temp is", temp);
      if (temp) {
        newData.push(temp);
      }
    }
    currentItem.data = newData;
    return currentItem;
  }
};
