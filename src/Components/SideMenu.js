import React, { useState } from "react";
import { Button, Input } from 'reactstrap';
import UploadFileModal from './UploadFileModal';
import "./SideMenu.css";

const asideStyle = {
  margin: "41px 6px 0 6px",
  width: "20%",
  minWidth: "50px"
}

const ulStyle = {
  listStyle: "none",
  padding: "0"
}

const liStyle = {
  marginTop: "15px",
  padding: "0",
  fontSize: "large"
}

const accountStyle = {
  position: "absolute",
  right: "10px",
  top: "10px"
}

const usernameStyle = {
  marginRight: "5px",
  verticalAlign: "baseline"
};

function SideMenu(props) {
  const [modal, updateModal] = useState(props.uploadFileToggle);

  function toggle() {
    console.log(modal);
    updateModal(!modal);
  }

  return (
    <aside style={asideStyle}>
      <UploadFileModal uploadFileToggle={props.uploadFileToggle} uploadFile={props.uploadFile} />
      <Input size="lg" type="text" placeholder="Search" onChange={(e) => { props.filterFile(e); }} value={props.search} />
      <ul style={ulStyle}>
        <li style={liStyle} onClick={toggle}>Upload File</li>
        <li style={liStyle}>New Folder</li>
      </ul>
      <div style={accountStyle}>
        <span style={usernameStyle}>{props.user}</span>
        <Button color="success" onClick={props.logOut}>Log out</Button>
      </div>
    </aside>
  );
}

export default SideMenu;
