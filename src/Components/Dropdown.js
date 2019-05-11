import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Action extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle outline caret border="none"><i class="material-icons">more_horiz</i></DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Delete</DropdownItem>
          <DropdownItem>Rename</DropdownItem>
          <DropdownItem>Move</DropdownItem>
          <DropdownItem>Copy</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Action;