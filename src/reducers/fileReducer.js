import { insertData, deleteData, updateData } from "../helpers/dataModify";

export function fileReducer(state, { type, payload = {} }) {
  switch (type) {
    case "INSERT":
      insertData(state, payload.parentKey, payload.value, payload.isFolder);
      return { ...state };
    case "DELETE":
      deleteData(state, payload.parentKey);
      return { ...state };
    case "UPDATE":
      updateData(state, payload.parentKey, payload.value);
      return { ...state };
    default:
      return { ...state };
  }
}
