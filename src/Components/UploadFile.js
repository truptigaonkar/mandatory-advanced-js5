import React, { useState } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken, updateFavoriteObservable } from '../store';
import { Alert, Button, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function UploadFile(props) {
  const [token, updateTokenState] = useState(token$.value);
  const [modal, updateModal] = useState(false);
  const [file, updateFile] =  useState(null);
  const currentLocation = props.location.pathname.substring(5);

  function toggle() {
    updateModal(!modal)
  }

  function handleUploadFile(file) {
    const dropbox = new Dropbox({ accessToken: token, fetch });
  
    if (file.size > 0 && file.size < 150000000) {
      dropbox
        .filesUpload({
          contents: file,
          path: `${currentLocation}/${file.name}`
        })
        .then(response => {
          props.onUpload();
          updateModal(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  function onUploadSubmit(e) {
    e.preventDefault();
    
    if (!file) {
      return alert("Please select a file")
      //() => {return <Alert color="danger">Please select a file</Alert>}
    }

    handleUploadFile(file);
    updateModal(false);
  }

  function onChangeFile(e) {
    updateFile(e.target.files[0] || null);
  }

  return (
    <>
      <Button onClick={toggle}>Upload File</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload file</ModalHeader>
        <ModalBody>
          <FormGroup id="upload">
            <Label htmlFor="uploadfile">Please select a file to upload</Label>
            <Input type="file" name="file" id="uploadfile" onChange={onChangeFile} />
            <FormText color="muted">The size of a file should not exceed 150MB.</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            htmlFor="upload"
            type="submit"
            color="success"
            onClick={(e) => onUploadSubmit(e)}
          >
            Upload
          </Button>{" "}
          <Button
            color="secondary"
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadFile;
