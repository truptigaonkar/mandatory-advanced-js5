import React, { useState, useEffect } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../store';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const CreateFolder = (props) => {

  const [modal, updateModal] = useState(false);
  const [folderName, updateFolderName] = useState("");
  const filePath = props.location.pathname.substring(5);

  // Triggering modal to open
  function toggleFolder() {
    updateModal(true)
  }

  //Closing modal
  function exitModal() {
    updateModal(false)
  }

  // Handle input
  function handleFolderName(e) {
    updateFolderName(e.target.value);
  }

  // Handling create button function
  function handleNewFolder() {
    let dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesCreateFolder({ path: filePath + "/" + folderName, autorename: true })
      .then((response) => {
        props.onNewFolder(response);
        exitModal();
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <>
      <Button onClick={toggleFolder}>New Folder</Button>
      <Modal isOpen={modal} toggle={toggleFolder} >
        <ModalHeader toggle={exitModal}>Create New Folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Folder name</Label>
            <Input type="text" placeholder="Folder name" onChange={handleFolderName} value={folderName} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleNewFolder}>Create</Button>{' '}
          <Button color="secondary" onClick={exitModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateFolder;