import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FolderList from "./FolderList.js";

const AllFolders = (props) => {
  const [folders, updateFolders] = useState([]);
  const [token, updateTokenState] = useState(token$.value);
  //const [destinationFolder, updateDestinationFolder] = useState("");
  const path = "";

  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token, fetch });
    dropbox.filesListFolder({ path: path, recursive: true })
      .then(function (response) {
        console.log('response.entries: ', response.entries);
        let folderList = [];
        for (let element of response.entries) {
          if (element[".tag"] === "folder") {
            folderList.push({ name: element.name, path: element.path_lower })
          }
        }
        console.log("folderList", folderList);
        updateFolders(folderList);
      })
      .catch(function (error) {
        console.error(error);
      })
  },[]);

  /* const allfolders = folders.map(folder =>
    <option key={folder.path} value={folder.path}>{folder.name}</option>
  );
  //console.log("data", data);

  function onChangeGetFolder(event) {
    console.log(event.target.value);
    props.updateToFolder(event.target.value);
  }

  //console.log('Folders in MoveFile: ', folders);

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

  //let currentLocation = props.location.pathname.substring(5);

  function toggle() {
    updateModal(!modal)
  }

  function handleMoveFile(fileToMove) {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    let to_path = toFolder;
    if (to_path === "/") {
      to_path = "";
    }
    console.log(fileToMove.path_lower, to_path);
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
