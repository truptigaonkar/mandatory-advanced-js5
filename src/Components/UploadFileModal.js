import React, { useRef, useState } from "react";
import { Button, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function UploadFileModal(props) {
  const [modal, updateModal] = useState(props.modal);
  const fileInputRef = useRef(null);
  console.log(modal);


  function onUploadSubmit(e) {
    e.preventDefault();
    props.uploadFile(fileInputRef.current.files);
  }

  return (
    <>
      <Modal isOpen={modal} toggle={() => updateModal(!modal)}>
        <ModalHeader toggle={() => updateModal(!modal)}>Upload file</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="uploadfile">File</Label>
            <Input type="file" name="file" id="uploadfile" ref={fileInputRef} />
            <FormText color="muted">The size of a file should not exceed 150MB.</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="success"
            onClick={() => updateModal(!modal)}
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
          <Button color="secondary" onClick={() => updateModal(!modal)}> {/*<Button color="secondary" onClick={toggle(false)}>*/}
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadFileModal;
