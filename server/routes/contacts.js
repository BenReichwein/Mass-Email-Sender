const Contacts = require('../models/Contacts')

const contacts = (app) => {
    app.get('/contacts', async (req, res) => {
        try {
            const contact = await Contacts.find();
            res.json(contact)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Submits a post - Needs to be req.json to submit
    app.post('/contacts', async (req, res) => {
        if (
            !req.body.name ||
            !req.body.email
          )
            return res.status(400).json({
              err: 'Name or Email not provided',
            });
    
          if (
            !req.body.email.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          )
            return res.status(422).json({ err: 'Email format is not valid' });

        const contact = new Contacts({
            name: req.body.name,
            email: req.body.email
        });
        try {
            const savedContact = await contact.save();
            res.json(savedContact);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Specific contact
    app.get('/contacts/:contactsID', async (req, res) => {
        try {
            const contact = await Contacts.findById(req.params.contactsID)
            res.json(contact);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
    // Delete post
    app.delete('/contacts/:contactsID', async (req, res) => {
        try {
            const removedContact = await Contacts.remove({_id: req.params.contactsID});
            res.json(removedContact)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
    // Update post
    app.patch('/contacts/:contactsID', async (req, res) => {
        try {
            const updatedContacts = await Contacts.updateOne(
                {_id:req.params.contactsID},
                {$set: {
                    name:req.body.name,
                    email:req.body.email,
                }}
            );
            res.json(updatedContacts);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
};

module.exports = contacts;