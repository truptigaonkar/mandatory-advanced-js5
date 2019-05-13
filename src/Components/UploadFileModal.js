import React, { useRef, useState } from "react";
import { Button, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function UploadFileModal(props) {
  const [modal, updateModal] = useState(props.UploadFileModal); //toggle={() => updateModal(!modal)} toggle={() => updateModal(!modal)} onClick={() => updateModal(!modal)} onClick={() => updateModal(!modal)}
  const fileInputRef = useRef(null);

  function toggle() {
    console.log(modal);
    updateModal(!modal)
  }

  function onUploadSubmit(e) {
    e.preventDefault();
    props.uploadFile(fileInputRef.current.files);
    //updateModal(false);
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload file</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="uploadfile">Please select a file to upload</Label>
            <Input type="file" name="file" id="uploadfile" ref={fileInputRef} />
            <FormText color="muted">The size of a file should not exceed 150MB.</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="success"
            onClick={toggle}
            onSubmit={(e) => onUploadSubmit(e)}
          >
            {/*<Button
            type="submit"
            color="success"
             onClick={toggle(false)} 
            onSubmit={(e) => onUploadSubmit(e)}
          >*/}
            Upload
          </Button>{" "}
          <Button
            color="secondary"
            onClick={toggle}
          > {/*<Button color="secondary" onClick={toggle(false)}>*/}
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadFileModal;
