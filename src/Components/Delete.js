import React, { useState, useEffect } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken, favorites$, updateFavoriteObservable } from "../store";
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
          let folderToDelete = currentFolder.filter((t) => {
            return file !== t;
          })
          setCurrentFolder(folderToDelete);
          props.onDataChange();
          toggle();
        })
        .catch(err => {
          console.error(err);
        })

      //Removing object from favorites
      let id = file.id;
      let favorites = favorites$.value;
      let filteredFavorites = favorites.filter(object => {
        return object.id !== id;
      });
      updateFavoriteObservable(filteredFavorites);
    }

  return (
    <>
    <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
        <ModalHeader toggle={toggle}>Delete file/folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Are you sure want to delete "{fileToDelete && fileToDelete.name}"?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(props.file)}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Delete;
