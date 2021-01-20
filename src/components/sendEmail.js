import React, { Component } from 'react'
import API from '../api';

export default class sendEmail extends Component {
    state = {
        contacts: [],
        emails: [],
        name: '',
        email: '',
        subject: '',
        html: '',
      }
    
      componentDidMount() {
        // Gets contacts
        API.get(`contacts`)
          .then(res => {
            const contacts = res.data;
            this.setState({ contacts });
          })
        // Gets previous emails
        API.get(`email`)
          .then(res => {
            const emails = res.data;
            this.setState({ emails });
          })
      }

      handleSubjectChange = e => {
        this.setState({ subject: e.target.value });
      }

      handleHtmlChange = e => {
        this.setState({ html: e.target.value });
      }
    
      handleSubmit = e => {
        e.preventDefault();

        let contactEmails = ''
        let emails = []

        this.state.contacts.map(contacts => {
          emails.push(contacts.email)
          contactEmails = emails.join(', ')
          return contactEmails
       });

        API.post(`email`, {
            emails: contactEmails,
            subject: this.state.subject,
            html: this.state.html
         })
        .then(res => {
            alert('Email Sent')
            console.log(res.data);
            window.location.reload()
          })
          .catch(res => {
            alert('Email did not send, try again later')
            console.log(res.data)
          })
      }

      deleteEmail = id => {
        API.delete(`email/${id}`)
        .then(res => {
            alert('Email Deleted!')
            console.log(res);
            console.log(res.data);
            window.location.reload()
        })
      }

    render() {
        return (
          <div>
            <div>
                <h1>Send Email</h1>
                <p>Sending to:</p>
                { this.state.contacts.map(contact =>
                    <p>{contact.email}</p>
                )}
                <form onSubmit={this.handleSubmit}>
                <label>
                    Subject:
                    <br/>
                    <input type="text" name="subject" onChange={this.handleSubjectChange} />
                    <br/>
                    Html:
                    <br/>
                    <textarea type="text" name="html" onChange={this.handleHtmlChange} />
                </label>
                <br/>
                <button type="submit">Send</button>
                </form>
            </div>
            <div>
              <h1>Previous Emails</h1>
              <ul>
                  { this.state.emails.map(email =>
                  <li>
                    {email.email}
                    <button onClick={()=> this.deleteEmail(email._id)}>Delete</button>
                  </li>
                  )}
              </ul>
            </div>
          </div>
        )
    }
}


