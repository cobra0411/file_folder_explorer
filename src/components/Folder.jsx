import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileIcon, defaultStyles } from "react-file-icon";
import {
  faFileArrowUp,
  faEdit,
  faPencil,
  faCross,
  faArrowDownUpAcrossLine,
  faCrosshairs,
  faSquareXmark,
  faXmarkSquare,
  faXmarksLines,
  faSackXmark,
  faDeleteLeft,
  faFile,
  faArrowUp,
  faXmark,
  faPen,
  faFolder,
  faFolderClosed,
  faFolderOpen,
  faFolderPlus
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { FileDispatch } from "../context/fileDataContext";

export const Folder = (props) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [createNewFile, setCreateNewFile] = useState(false);
  const dispatch = useContext(FileDispatch);
  const onFolderClick = (event) => {
    event.stopPropagation();
    setIsFolderOpen(!isFolderOpen);
  };
  const uploadFile = () => {
    console.log("upload file clicked");
  };
  const renameFile = (event) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
    setCurrentValue(props.name);
    console.log("rename file clicked");
  };
  const changeElementName = (event) => {
    setCurrentValue(event.target.value);
  };
  const OnFolderNameChange = (event) => {
    event.stopPropagation();
    console.log("setting folder name", event.target.value);
    setFolderName(event.target.value);
  };
  const OnFileNameChange = (event) => {
    event.stopPropagation();
    console.log("setting folder name", event.target.value);
    setFileName(event.target.value);
  };
  const getFileNameWithExtension = (tempFileName) => {
    const splitted = tempFileName.split(".");
    if (splitted.length >= 2) {
      return tempFileName;
    } else {
      tempFileName = tempFileName + ".txt";
      return tempFileName;
    }
  };
  const onEnterHit = (event) => {
    event.stopPropagation();
    const code = event.charCode;
    if (code === 13) {
      if (isEditing) {
        props.name = currentValue;
        // change on main data value =>
        setIsEditing(false);
        console.log("updating calls");
        dispatch({
          type: "UPDATE",
          payload: { parentKey: props.id, value: currentValue }
        });
        console.log("enter triggered");
      } else if (createNewFolder) {
        // add new folder in data
        console.log("setting folder creation false");
        // parentKey, value, isFolder
        //setData(props.id, folderName, true, "INSERT");
        setCreateNewFolder(false);
        dispatch({
          type: "INSERT",
          payload: { parentKey: props.id, value: folderName, isFolder: true }
        });
        // setCreateNewFolder(false);
      } else if (createNewFile) {
        // add new file in data
        console.log("setting folder creation false");
        setCreateNewFile(false);
        const newFileName = fileName
          ? getFileNameWithExtension(fileName)
          : fileName;
        dispatch({
          type: "INSERT",
          payload: { parentKey: props.id, value: newFileName, isFolder: false }
        });
      }
    }
  };

  const newFolder = (event) => {
    event.stopPropagation();
    setCreateNewFolder(true);
    setFolderName("");
    setIsFolderOpen(true);
    console.log("new folder clicked");
  };
  const onFolderNameClick = (event) => {
    event.stopPropagation();
  };
  const onEditFieldClick = (event) => {
    event.stopPropagation();
  };
  const onFileNameClick = (event) => {
    event.stopPropagation();
  };
  const deleteFolder = (event) => {
    event.stopPropagation();
    console.log("delete file clicked");
    // payload.parentKey, payload.value, payload.isFolder
    console.log("props are =>", props);
    dispatch({
      type: "DELETE",
      payload: { parentKey: props.id, value: "", isFolder: null }
    });
    // setData(props.id, "", null, "DELETE");
  };
  const newFile = (event) => {
    event.stopPropagation();
    setCreateNewFile(true);
    setFileName("");
    setIsFolderOpen(true);
    console.log("new file clicked");
  };
  const getFileExtension = (fileName) => {
    console.log("fileName is", fileName);
    const splitted = fileName.split(".");
    const extension = splitted[splitted.length - 1];
    console.log("extension is", extension);
    return extension;
  };
  const onBlurInput = (event) => {
    console.log("on blur called...", event);
    setFileName("");
    setIsEditing(false);
  };
  return (
    <div className="folder" onClick={onFolderClick}>
      <div className="folder_metaData">
        <div className="folder_content">
          <div className="folder_icon">
            {props.isFolder ? (
              <FontAwesomeIcon
                className="blue"
                icon={isFolderOpen ? faFolderOpen : faFolder}
              />
            ) : (
              <div className="icon_size">
                <FileIcon
                  extension={getFileExtension(props.name)}
                  {...defaultStyles[getFileExtension(props.name)]}
                />
              </div>
              // <FontAwesomeIcon className="yellow" icon={faFile} />
            )}
          </div>
          {isEditing ? (
            <input
              className="inputFieldClass"
              value={currentValue}
              onChange={changeElementName}
              onBlur={onBlurInput}
              onKeyPress={onEnterHit}
              onClick={onEditFieldClick}
            />
          ) : (
            <div className="folder_name">{props.name}</div>
          )}
        </div>
        {props.isFolder ? (
          <div className="hover_actions">
            <div onClick={uploadFile} className="action_icon">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div onClick={renameFile} className="action_icon">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div onClick={newFile} className="action_icon">
              <FontAwesomeIcon icon={faFile} />
            </div>
            <div onClick={newFolder} className="action_icon">
              <FontAwesomeIcon icon={faFolder} />
            </div>
            <div onClick={deleteFolder} className="action_icon">
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        ) : (
          <div className="hover_actions">
            <span onClick={renameFile} className="action_icon">
              <FontAwesomeIcon icon={faPen} />
            </span>
            <span onClick={deleteFolder} className="action_icon">
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        )}
      </div>
      <div className={isFolderOpen ? "subFolder open" : "subFolder closed"}>
        {createNewFolder ? (
          <div className="createNewFolder">
            <span>
              <FontAwesomeIcon icon={faFolderClosed} />
            </span>
            <span>
              <input
                autoFocus
                onClick={onFolderNameClick}
                value={folderName}
                onKeyPress={onEnterHit}
                onChange={OnFolderNameChange}
              />
            </span>
          </div>
        ) : null}
        {createNewFile ? (
          <div className="createNewFolder">
            <span>
              <FontAwesomeIcon icon={faFile} />
            </span>
            <span>
              <input
                autoFocus
                onClick={onFileNameClick}
                value={fileName}
                onKeyPress={onEnterHit}
                onChange={OnFileNameChange}
              />
            </span>
          </div>
        ) : null}
        {props.data ? props.data.map((item) => <Folder {...item} />) : null}
      </div>
    </div>
  );
};
