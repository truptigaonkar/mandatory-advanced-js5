import React, { useRef, useState } from "react";
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../store';
import { Button, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function UploadFileModal(props) {
  const [token, updateTokenState] = useState(token$.value);
  const [modal, updateModal] = useState(false); //toggle={() => updateModal(!modal)} toggle={() => updateModal(!modal)} onClick={() => updateModal(!modal)} onClick={() => updateModal(!modal)}
  const fileInputRef = useRef(null);
  const currentLocation = window.location.pathname.substring(5);

  function toggle() {
    updateModal(!modal)
  }

  function uploadFile(files) {
    const dropbox = new Dropbox({ accessToken: token, fetch });
    console.log(files);
    

    if (files.length > 0 && files[0].size < 150000000) {
      dropbox
        .filesUpload({
          contents: files[0],
          path: `${currentLocation}/${files[0].name}`
        })
        .then(response => {
          dropbox.filesListFolder({ path: currentLocation })
            .then(response => {
              updateModal(false);
              console.log(response.entries);
              
            })
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  function onUploadSubmit(e) {
    e.preventDefault();
    uploadFile(fileInputRef.current.files);
    window.location.reload();
    updateModal(false);
  }

  return (
    <>
      <Button onClick={toggle}>Upload File</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload file</ModalHeader>
        <ModalBody>
          <FormGroup id="upload">
            <Label for="uploadfile">Please select a file to upload</Label>
            <Input type="file" name="file" id="uploadfile" ref={fileInputRef} />
            <FormText color="muted">The size of a file should not exceed 150MB.</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            for="upload"
            type="submit"
            color="success"
            onClick={toggle}
          >
            Upload
          </Button>{" "}
          <Button
            color="secondary"
            onClick={(e) => onUploadSubmit(e)}
          > {/*<Button color="secondary" onClick={toggle(false)}>*/}
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadFileModal;
