import React from "react";
import { Button, ButtonGroup } from 'reactstrap';
import UploadFile from './UploadFile';
import CreateFolder from './CreateFolder';

const asideStyle = {
  margin: "41px 6px 0 6px",
  width: "20%",
  minWidth: "50px"
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
      <ButtonGroup vertical>
        <UploadFile onUpload={props.onUpload} location={props.location} file={props.file} />
        <CreateFolder onNewFolder={props.onNewFolder} location={props.location} />
      </ButtonGroup>
      <div style={accountStyle}>
        <span style={usernameStyle}>{props.user}</span>
        <Button color="success" onClick={props.logOut}>Log out</Button>
      </div>
    </aside>
  );
}

export default SideMenu;
