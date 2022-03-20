import React, {Component} from "react";
import {Form, Modal, Button} from 'react-bootstrap';

export default class ModalForm extends Component {

  state={ name: null }

  handleChange = (e) => this.setState({name: e.target.value})

  render(){
    return(
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
      
      <Modal.Header closeButton>
        <Modal.Title>Add a task:D</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
          <Form.Group >
              <Form.Label>Task name: </Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.name} placeholder="Task name"/>    

              <Form.Label>Task Description: </Form.Label>
              <Form.Control as="textarea" onChange={this.handleChange} value={this.state.name} placeholder="Task Description"/>       
          </Form.Group>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="success" type="submit" onClick={() => this.props.handleSubmit(this.state.name)}>
              Create task
          </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
