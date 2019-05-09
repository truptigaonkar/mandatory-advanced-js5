import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function UploadFileModal(props) {
  const [modal, toggle] = useState(true);
  const fileInputRef = useRef(null);

  function onUploadSubmit(e) {
    e.preventDefault();
    props.uploadFile(fileInputRef.current.files[0]);
  }

  return (
    <>
      <Modal isOpen={modal} className={props.className}>
        <ModalHeader>Upload file</ModalHeader>
        <ModalBody>
          <Input type="file" ref={fileInputRef} />
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="success"
            onClick={toggle(false)}
            onSubmit={onUploadSubmit}
          >
            Upload
          </Button>{" "}
          <Button color="secondary" onClick={toggle(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UploadFileModal;
