import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Rename = (props) => {

  const [modal, updateModal] = useState(props.toggle);
  const [newName, updateNewName] = useState("");
  const [fileToRename, updateFileToRename] = useState(props.file);
  const [currentFolder, setCurrentFolder] = useState([]);
  const [folderName, updateFolderName] = useState("");
  const [renameFileData, setRenameFileData] = useState({});

  function toggle() {
    updateModal(!modal)
  }

  /*
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
  */

  function handleRename(file) {
    //const currentPath = props.location.pathname.substr(5);
    const beforePath = file.path_lower;
    let afterPath = newName;
    afterPath = `/${afterPath}`;
    /*
    let fileData = JSON.parse(JSON.stringify(renameFileData))
    let newPath = fileData.path;
    newPath = newPath.split('/');
    newPath[newPath.length - 1] = fileData.fileName;
    newPath = newPath.join('/');
    */

    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesMoveV2({
      from_path: beforePath,
      to_path: afterPath,
      autorename: true
    })
      .then((res) => {
        //let renamedFile = res.metadata
        dropbox.filesListFolder({ path: afterPath })
          .then(res => {
            //setCurrentFolder(res.entries);
            props.onDataChange();
            toggle();
          })
      }) 

  }

/*
  <FormGroup>
            <Label for="name">Rename {fileToRename}</Label>
            <Input type="text" placeholder="Folder name" onChange={handleFolderName} value={folderName} />
          </FormGroup>

          <FormGroup>
          <Label htmlFor="newName">Rename {fileToRename}</Label>
          <Input name="newName" type="text" placeholder="New name" onChange={handleFolderName} value={folderName} />
          </FormGroup>
*/
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
        <ModalHeader toggle={toggle}>Rename file/folder</ModalHeader>
        <ModalBody>
          Please specify a new name
          <Input onChange={(e) => { updateNewName(e.target.value); }} value={newName} placeholder="New name" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleRename(props.file)}>Rename</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Rename;