import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AllFolders = () => {
  const [moveToFolder, updateMoveToFolder] = useState([]);
  let folderList = [];
  let allfolders = "";

  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesListFolder({ path: "", recursive: true })
      .then(function (response) {
        updateMoveToFolder(response.entries);
        for (let element of moveToFolder) {
          if (element[".tag"] === "folder") {
            folderList.push({ name: element.name, path: element.path_display })
          }
        }
        allfolders = folderList.map(folder =>
          <option value={folder.path}>{folder.name}</option>
        );
        console.log("folderList", folderList);
        console.log("allfolders", allfolders);
      })
      .catch(function (error) {
        console.error(error);
      })
  })

  return (
    <>
      
        <select name="folder">
          <option value="">Select Folder</option>
          {allfolders}
        </select>
      
    </>
  )
}

const MoveFile = (props) => {

  const [modal, updateModal] = useState(props.toggle);
  const [fileToMove, updateFileToMove] = useState(props.file);
  const [currentFolder, setCurrentFolder] = useState([]);
  let currentLocation = props.location.pathname.substring(5);

  function toggle() {
    updateModal(!modal)
  }

  function handleMoveFile(file) {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    if (currentLocation === "/") {
      currentLocation = "";
    }
    dropbox.filesMoveV2({ from_path: file.path_lower, to_path: "/home/e"})
    .then(response => {
      props.onDataChange();
      toggle();
    })
    .catch(err => {
      console.error(err);
    })
  }
  

/*   useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesListFolder({ path: "", recursive: true })
      .then(function (response) {
        updateMoveToFolder(response.entries);
        for (let element of moveToFolder) {
          if (element[".tag"] === "folder") {
            folderList.push({ name: element.name, path: element.path_display })
          }
        }
        allfolders = folderList.map(folder =>
          <option value={folder.path}>{folder.name}</option>
        );
      })
      .catch(function (error) {
        console.error(error);
      })
  }); */

  /* function getAllFolderElements(folderList) {
    folderList.map(folder =>
      <option value={folder.path}>{folder.name}</option>
    )
    console.log(folderList);
    return folderList;
  } */




  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Move file</ModalHeader>
        <ModalBody>
          Move "{fileToMove && fileToMove.name}" to <AllFolders />
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