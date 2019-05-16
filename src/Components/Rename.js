import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Rename = (props) => {
 
const [modal, updateModal] = useState(props.modal);
const [fileToRename, updateFileToRename] = useState(props.file);
const [currentFolder, setCurrentFolder] = useState([]);
const [folderName, updateFolderName] = useState("");
const [renameFileData, setRenameFileData] = useState({});

function toggleFolder(file) {
  // let fileData = {
  //   fileName: file.name,
  //   path: file.path_display,
  // }
  // setRenameFileData(fileData);
  updateModal(true)
}

//Closing modal
function exitModal() {
  updateModal(false)
}

  // Handle input
  function handleFolderName(e) {
  
      // let fileData = {
  //   fileName: file.name,
  //   path: file.path_display,
  // }
  // setRenameFileData(fileData);
    console.log("console log input value: ", e.target.value);
    let fileData = JSON.parse(JSON.stringify(renameFileData));
    fileData.fileName = e.target.value;
    updateFolderName(fileData);
  }

function handleRename() {
  console.log('rename test');
  const currentPath = props.location.pathname.substr(5);
  let fileData = JSON.parse(JSON.stringify(renameFileData))
  let newPath = fileData.path;
  newPath = newPath.split('/');
  newPath[newPath.length - 1] = fileData.fileName;
  newPath = newPath.join('/');

  const dbx = new Dropbox({accessToken: token$.value, fetch});
  dbx.filesMoveV2({
    from_path: fileData.path,
    to_path: newPath,
  })
  .then((res) => {
    let renamedFile = res.metadata
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesListFolder({path: currentPath})
    .then(res => {
      //updateFavorites(renamedFile);
      setCurrentFolder(res.entries);
      updateModal(true)
    })
  })
  
}

  return (
    <>
     <Modal isOpen={modal} toggle={toggleFolder} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
        <ModalHeader toggle={exitModal}>Rename file/folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            {/* <Label>Are you sure want to delete "{fileToDelete && fileToDelete.name}"?</Label> */}
            <Label for="name">Rename file/folder</Label>
              <Input type="text" placeholder="Folder name" onChange={handleFolderName} value={folderName} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleRename(props.file)}>Rename</Button>{' '}
          <Button color="secondary" onClick={exitModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </>
      )

}

export default Rename;