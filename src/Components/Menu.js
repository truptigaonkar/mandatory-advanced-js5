import React, { React } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props):
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind.(this);
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return(
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalBody>
          <Button color="primary" onClick={this.toggle}>Delete</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalBody>
        </Modal>
      </>
    )
  }
}