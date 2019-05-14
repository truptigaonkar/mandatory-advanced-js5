import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./Dropdown.css"
import Delete from "./Delete"

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      file: props.file,
      deleteModal: false
    };

    this.toggle = this.toggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  deleteToggle() {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }))
    console.log("deleteToggle");
    console.log(this.state.deleteModal);
    
    
  }

  //onClick={() => { updateFileToDelete(file); toggleFolder() }}

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle color="primary" outline caret><i class="material-icons">more_horiz</i></DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.deleteToggle}><Delete file={this.state.file} toggle={this.state.deleteModal} />Delete</DropdownItem> 
          <DropdownItem>Rename</DropdownItem>
          <DropdownItem>Move</DropdownItem>
          <DropdownItem>Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Action;