import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./Dropdown.css";
import Delete from "./Delete";
import MoveFile from "./MoveFile";

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      file: props.file,
      deleteModal: false,
      moveModal: false,
      onDataChange: props.onDataChange,
      location: props.location
    };

    this.toggle = this.toggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
    this.moveToggle = this.moveToggle.bind(this);
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
  }

  moveToggle() {
    this.setState(prevState => ({
      moveModal: !prevState.moveModal
    }))
  }

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle color="primary" outline caret><i class="material-icons">more_horiz</i></DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.deleteToggle}><Delete file={this.state.file} toggle={this.state.deleteModal} onDataChange={this.state.onDataChange} />Delete</DropdownItem> 
          <DropdownItem>Rename</DropdownItem>
          <DropdownItem onClick={this.moveToggle}><MoveFile file={this.state.file} toggle={this.state.moveModal} onDataChange={this.state.onDataChange} location={this.state.location} />Move</DropdownItem>
          <DropdownItem>Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Action;