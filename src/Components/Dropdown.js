import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./Dropdown.css";
import Delete from "./Delete";
import { Copy } from './Copy.js';
import { token$ } from "../store.js";
import { Dropbox } from 'dropbox';

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      file: props.file,
      deleteModal: false,
      onDelete: props.onDelete
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
  }

  //onClick={() => { updateFileToDelete(file); toggleFolder() }}

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
          <DropdownItem onClick={this.deleteToggle}><Delete file={this.state.file} toggle={this.state.deleteModal} onDelete={this.state.onDelete} />Delete</DropdownItem>
          <DropdownItem>Rename</DropdownItem>
          <DropdownItem>Move</DropdownItem>
          <DropdownItem onClick={() => this.handleCopy(this.state.file)}>Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Action;
