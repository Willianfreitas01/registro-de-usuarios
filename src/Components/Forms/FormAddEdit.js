import React from 'react';
import {Form, FormGroup, Label, Input } from 'reactstrap';


class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: '',
    location: '',
    hobby: ''
  }
  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(`https://636e5c89b567eed48adb2fb3.mockapi.io/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.address,
        hobby: this.state.hobby,
        createAt: this.state.createAt
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`https://636e5c89b567eed48adb2fb3.mockapi.io/users/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.address,
        hobby: this.state.hobby,
        createAt: this.state.createAt
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if (this.props.item) {
      const { id, name, address, createAt, phone, location, hobby } = this.props.item
      this.setState({ id, name, address, createAt, phone, location, hobby })
    }
  }
  

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="hobby" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby === null ? '' : this.state.hobby} />
        </FormGroup>
        <button >Submit</button>
      </Form>
    );
  }
}

export default AddEditForm