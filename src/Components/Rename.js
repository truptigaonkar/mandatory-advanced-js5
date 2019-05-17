import React, { useState } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const Rename = (props) => {

  const [modal, updateModal] = useState(props.toggle);
  const [newName, updateNewName] = useState("");

  function toggle() {
    updateModal(!modal)
  }

  function handleFolderRename(folder) {
    let beforePath = folder.path_lower.split("/");
    let afterPath;
    if (beforePath.length <= 2) {
      afterPath = `/${newName}`;
    }
    else {
      beforePath.shift();
      beforePath.pop();
      afterPath = `/${beforePath.join('/')}/${newName}`;
    }
    
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesMoveV2({
      from_path: folder.path_lower,
      to_path: afterPath,
      autorename: true
    })
      .then(res => {
        dropbox.filesListFolder({ path: afterPath })
          .then(res => {
            props.onDataChange();
            toggle();
          })
      })
  }

  function handleFileRename(file) {
    let beforePath = file.path_lower.split("/");
    let fileExtention = file.name.split(".")[1];
    let afterPath;
    let renderPath;

    if (beforePath.length <= 2) {
      afterPath = `/${newName}.${fileExtention}`
      renderPath = ""
    }
    else {
      beforePath.shift();
      beforePath.pop();
      afterPath = `/${[beforePath].join("/")}/${newName}.${fileExtention}`;
      renderPath = `/${[beforePath].join("/")}`
    }

    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesMoveV2({
      from_path: file.path_lower,
      to_path: afterPath,
      autorename: true
    })
      .then(res => {
        dropbox.filesListFolder({ path: renderPath })
          .then(res => {
            props.onDataChange();
            toggle();
          })
      })
  }

  function handleRename(file) {
    if (file[".tag"] === "folder") {
      handleFolderRename(file);
    }
    else {
      handleFileRename(file);
    }
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
        <ModalHeader toggle={toggle}>Rename file/folder</ModalHeader>
        <ModalBody>
          New name for {props.file.name}
          <Input onChange={(e) => { updateNewName(e.target.value); }} value={newName} placeholder="New name" />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleRename(props.file)}>Rename</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Rename;