import React, { useState, useEffect } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../store';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Delete = (props) => {

    const [modal, updateModal] = useState(props.toggle);
    const [fileToDelete, updateFileToDelete] = useState(props.file);
    const [currentFolder, setCurrentFolder] = useState([]);

    function toggle() {
      updateModal(!modal)
    }

    function handleDelete(file) {
      const dropbox = new Dropbox({ accessToken: token$.value, fetch });
      dropbox.filesDeleteV2({ path: fileToDelete.path_lower })
        .then(response => {
          console.log("delete response: ", response);
          let folderToDelete = currentFolder.filter((t) => {
            return file !== t;
          })
          setCurrentFolder(folderToDelete);
          props.onDelete();
          toggle();
        })
        .catch(err => {
          console.error(err);
        })
    }

  return (
    <>
    <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Delete file/folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Are you sure want to delete "{fileToDelete && fileToDelete.name}"?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(props.file)}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Delete;
