import React, { useState, useEffect } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../store';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Delete = (props) => {

    const [modal, updateModal] = useState(props.toggle);
    const [fileToDelete, updateFileToDelete] = useState(null);
    const [currentFolder, setCurrentFolder] = useState([]);
  
    function toggleFolder() {
      updateModal(true)
    }
  
    //Closing modal
    function exitModal() {
      updateModal(false)
    }
  
    function handleDelete(file) {
      console.log(file);
      const dropbox = new Dropbox({ accessToken: token$.value, fetch });
      dropbox.filesDeleteV2({ path: fileToDelete.path_lower })
        .then(response => {
          console.log("delete response: ", response);
          let folderToDelete = currentFolder.filter((t) => {
            return file !== t;
          })
          setCurrentFolder(folderToDelete);
          exitModal();
        })
        .catch(err => {
          console.error(err);
        })
      window.location.reload();
    }

  return (
    <>
    <Modal isOpen={modal} toggle={toggleFolder} >
        <ModalHeader toggle={exitModal}>Delete file/folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Are you sure want to delete "{fileToDelete && fileToDelete.name}"?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(props.file)}>Delete</Button>{' '}
          <Button color="secondary" onClick={exitModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Delete;