import React from "react";
import "./styles.css";
import { useReducer } from "react";
import { Folder } from "./components/Folder";
import { FileExplorerWrapper } from "./components/FileExplorerWrapper";
import { fileReducer } from "./reducers/fileReducer";
import dirData from "./data/data.json";
import { FileDispatch } from "./context/fileDataContext";
import { recursiveSort } from "./helpers/recursiveSort";

export default function App() {
  const [data = [], dispatch] = useReducer(fileReducer, dirData);
  recursiveSort(data.data);
  return (
    <div className="App">
      <FileDispatch.Provider value={dispatch}>
        <FileExplorerWrapper>
          <Folder {...data} />
        </FileExplorerWrapper>
      </FileDispatch.Provider>
    </div>
  );
}
