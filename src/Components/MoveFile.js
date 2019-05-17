import React, { useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FolderList from "./FolderList.js";

const AllFolders = (props) => {
  const [folders, updateFolders] = useState([]);
  const [token, updateTokenState] = useState(token$.value);
  const path = "";

  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token, fetch });
    dropbox.filesListFolder({ path: path, recursive: true })
      .then(function (response) {
        let folderList = [];
        for (let element of response.entries) {
          if (element[".tag"] === "folder") {
            folderList.push({ name: element.name, path: element.path_lower })
          }
        }
        updateFolders(folderList);
      })
      .catch(function (error) {
        console.error(error);
      })
  },[]);
  
  function onChangeGetFolder(event) {
    console.log(event.target.value);
    props.updateToFolder(event.target.value);
  }

  return (
    <>
      <form>
        <select name="folder" onChange={onChangeGetFolder}>
          <option value="">Select Folder</option>
          <FolderList folders={folders} />
        </select>
      </form>
    </>
  )
}

const MoveFile = (props) => {
  const [modal, updateModal] = useState(props.toggle);
  const [fileToMove, updateFileToMove] = useState(props.file);
  const [toFolder, updateToFolder] = useState("");
  const [currentFolder, setCurrentFolder] = useState([]);

  function toggle() {
    updateModal(!modal)
  }
/*
  function handleMoveFolder(fileToMove) {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    let to_path = toFolder;

    dropbox.filesMoveV2({ from_path: fileToMove.path_lower, to_path: to_path, autorename: false })
    .then(response => {
      props.onDataChange();
      toggle();
    })
    .catch(err => {
      console.error(err);
    })
  }
  */

  function handleMoveFile(fileToMove) {    
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    let to_path = `${toFolder}/${fileToMove.path_lower.split("/").pop()}`;

    dropbox.filesMoveV2({ from_path: fileToMove.path_lower, to_path: to_path, autorename: false })
    .then(response => {
      console.log("response", response);
      
      props.onDataChange();
      toggle();
    })
    .catch(err => {
      console.error(err);
    })
  }
/*
  function handleMove(file) {
    if (file[".tag"] === "folder") {
      handleMoveFolder(file);
    }
    else {
      handleMoveFile(file);
    }
  }
  */

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Move file</ModalHeader>
        <ModalBody>
          Move "{fileToMove && fileToMove.name}" to <AllFolders updateToFolder={updateToFolder} />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleMoveFile(props.file)}>Move</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MoveFile;