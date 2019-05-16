import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./Dropdown.css";
import Delete from "./Delete";
import Rename from "./Rename";
import MoveFile from "./MoveFile";
import { token$ } from "../store.js";
import { Dropbox } from 'dropbox';

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      file: props.file,
      deleteModal: false,
      renameModal: false,
      moveModal: false,
      onDataChange: props.onDataChange,
      location: props.location
    };

    this.toggle = this.toggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
    this.renameToggle = this.renameToggle.bind(this);
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

  renameToggle() {
    this.setState(prevState => ({
      renameModal: !prevState.renameModal
    }))
  }

  moveToggle() {
    this.setState(prevState => ({
      moveModal: !prevState.moveModal
    }))
  }

  handleCopy(file) {
    let path = file.path_lower;
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesCopy({
      from_path: path,
      to_path: path,
      allow_shared_folder: true,
      autorename: true,
    });
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
          <DropdownItem onClick={this.renameToggle}><Rename file={this.state.file} toggle={this.state.renameModal} onDataChange={this.state.onDataChange} />Rename</DropdownItem>
          <DropdownItem onClick={this.moveToggle}><MoveFile file={this.state.file} toggle={this.state.moveModal} onDataChange={this.state.onDataChange} location={this.state.location} />Move</DropdownItem>
          <DropdownItem onClick={() => this.handleCopy(this.state.file)}>Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Action;
