import React from "react";
import { Input } from 'reactstrap';

const asideStyle = { 
  margin: "41px 6px 0 6px",
  width: "20%",
  minWidth: "50px" 
}

function SideMenu(props) {
  return (
    <aside style={ asideStyle }>
      <Input type="text" placeholder="Search" />
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li>
          <a href="">Upload File</a>
        </li>
        <li>
          <p onClick={props.newFolder}>New Folder</p>
        </li>
      </ul>
    </aside>
  );
}

export default SideMenu;
