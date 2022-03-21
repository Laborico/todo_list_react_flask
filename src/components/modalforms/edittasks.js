import React, {Component} from "react";
import {Form, Modal, Button} from 'react-bootstrap';

export default class ModalForm extends Component {

  state={ 
            id: this.props.data.task_id,
            name: this.props.data.task_name,
            description: this.props.data.task_desc
        }

  handleChange = (e) => {
    var input = e.target.getAttribute('placeholder');
    if(input === "Task name") {
        this.setState({
            name: e.target.value
        })
    } else {
        this.setState({
            description: e.target.value
        })
    }
  }
  
  render(){
    return(
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
      
      <Modal.Header closeButton>
        <Modal.Title>Edit task:D</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
          <Form.Group >
              <Form.Label>Task name: </Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.name} placeholder="Task name"/>    

              <Form.Label>Task Description: </Form.Label>
              <Form.Control as="textarea" onChange={this.handleChange} value={this.state.description} placeholder="Task Description"/>       
          </Form.Group>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="success" type="submit" onClick={() => this.props.handleSubmit(this.state.id, this.state.name, this.state.description)}>
              Edit task
          </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
