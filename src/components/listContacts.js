import React, { Component } from 'react'
import API from '../api';

export default class listContacts extends Component {
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
    

      handleUpdate = id => {    
        API.patch(`contacts/${id}`, { 
            name: this.state.name,
            email: this.state.email
         })
        .then(res => {
            alert('Contact Updated!')
            console.log(res);
            console.log(res.data);
            window.location.reload()
          })
        .catch(res => {
          alert(res.data.message)
        })
      }

      deleteContact = id => {
        API.delete(`contacts/${id}`)
        .then(res => {
            alert('Contact Deleted!')
            console.log(res);
            console.log(res.data);
            window.location.reload()
        })
      }

    render() {
        return (
              <div>
                  <h1>List Contacts</h1>
                  <ul>
                      { this.state.contacts.map(contact =>
                      <li>
                        <form onSubmit={()=> this.handleUpdate(contact._id)}>
                        <label>
                            Name:
                            <input type="text" name="name" onChange={this.handleNameChange} placeholder={contact.name}/>
                            <br/>
                            Email:
                            <input type="text" name="email" onChange={this.handleEmailChange} placeholder={contact.email}/>
                        </label>
                        <br/>
                        <button type="submit">Update</button>
                        </form>
                        <button onClick={()=> this.deleteContact(contact._id)}>Delete</button>
                      </li>
                      )}
                  </ul>
                  <button onClick={()=> window.location.href='/addcontacts'}>Add Contact</button>
                  <br/>
                  <button onClick={()=> window.location.href='/sendemail'}>Send Email</button>
              </div>
        )
    }
}


