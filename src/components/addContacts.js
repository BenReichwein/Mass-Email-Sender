import React, { Component } from 'react'
import API from '../../api';

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
                <h1>Contacts</h1>
                <ul>
                    { this.state.contacts.map(contact =>
                    <li>
                    {contact.name}
                    <br/>
                    {contact.email}
                    <button onClick={()=> this.deleteContact(contact._id)}>Delete</button>
                    </li>
                    )}
                </ul>
            </div>
        )
    }
}


