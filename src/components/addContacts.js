import React, { Component } from 'react'
import API from '../api';

export default class addContacts extends Component {
    state = {
        contacts: [],
        name: '',
        email: ''
      }
    
      componentDidMount() {
        API.get(`contacts`)
          .then(res => {
            const contacts = res.data;
            this.setState({ contacts });
          })
      }

      handleNameChange = e => {
        this.setState({ name: e.target.value });
      }

      handleEmailChange = e => {
        this.setState({ email: e.target.value });
      }
    
      handleSubmit = e => {
        e.preventDefault();

    
        API.post(`contacts`, { 
            name: this.state.name,
            email: this.state.email
         })
        .then(res => {
            alert('Contact Added!')
            console.log(res);
            console.log(res.data);
            window.location.reload()
          })
        .catch(res => {
          alert(res)
        })
      }

    render() {
        return (
            <div>
                <h1>Add Contact</h1>
                <h5># of contacts: {this.state.contacts.length}</h5>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <br/>
                    <input type="text" name="name" onChange={this.handleNameChange} />
                    <br/>
                    Email:
                    <br/>
                    <input type="text" name="email" onChange={this.handleEmailChange} />
                </label>
                <br/>
                <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}