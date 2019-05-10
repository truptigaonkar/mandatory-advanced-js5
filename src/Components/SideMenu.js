import React from "react";
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
  return (
    <aside style={asideStyle}>
      <Input type="text" placeholder="Search" onChange={(e) => { props.updateSearch(e.target.value); }} value={props.search} />
      <ul style={ulStyle}>
        <li onClick={UploadFileModal}>Upload File</li>
        <li onClick={props.newFolder}>New Folder</li>
      </ul>
      <div style={accountStyle}>
        <span style={usernameStyle}>{props.user}</span>
        <Button onClick={props.logOut}>Log out</Button>
      </div>
    </aside>
  );
}

export default SideMenu;
