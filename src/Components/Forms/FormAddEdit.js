import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    Endereco: '',
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
        Endereco: this.state.Endereco,
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
        Endereco: this.state.Endereco,
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
      const { id, name, Endereco, createAt, phone, location, hobby } = this.props.item
      this.setState({ id, name, Endereco, createAt, phone, location, hobby })
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
          <Label for="Endereco">Endereco Name</Label>
          <Input type="text" name="Endereco" id="Endereco" onChange={this.onChange} value={this.state.Endereco === null ? '' : this.state.Endereco} />
        </FormGroup>
        <FormGroup>
          <Label for="createAt">createAt</Label>
          <Input type="createAt" name="createAt" id="createAt" onChange={this.onChange} value={this.state.createAt === null ? '' : this.state.createAt} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm