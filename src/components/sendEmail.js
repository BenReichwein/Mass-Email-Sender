import React, { Component } from 'react'
import API from '../api';

export default class sendEmail extends Component {
    state = {
        contacts: [],
        name: '',
        email: '',
        subject: '',
        html: '',
      }
    
      componentDidMount() {
        API.get(`contacts`)
          .then(res => {
            const contacts = res.data;
            this.setState({ contacts });
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

        API.post(`email`, {
            emails: 'reichweinben@gmail.com', 
            subject: this.state.subject,
            html: this.state.html
         })
        .then(res => {
            alert(res.data.message)
            console.log(res);
            console.log(res.data);
            window.location.reload()
          })
      }

    render() {
        return (
            <div>
                <h1>Send Email</h1>
                <p>Sending to:</p>
                { this.state.contacts.map(contact =>
                    <p>{contact.email}</p>
                )}
                <form onSubmit={this.handleSubmit}>
                <label>
                    Subject:
                    <input type="text" name="subject" onChange={this.handleSubjectChange} />
                    Html:
                    <textarea type="text" name="html" onChange={this.handleHtmlChange} />
                </label>
                <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}


