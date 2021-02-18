const Email = require('../models/Email')
const mailer = require("nodemailer");

const email = (app) => {
    app.get('/email', async (req, res) => {
        try {
            const email = await Email.find();
            res.json(email)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Sends Email
    app.post('/email', async (req, res) => {
        let transporter = mailer.createTransport({
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
              user: 'arcanederp@gmail.com', // make sure this email lesssecure! (https://myaccount.google.com/lesssecureapps)
              pass: 'Gamingmaster4224'
            }
        });
          
        let mail = {
            from: 'arcanederp@gmail.com',
            to: req.body.emails,
            subject: req.body.subject,
            html: req.body.html
          };
          
        transporter.sendMail(mail, function(error, info){
            if (error) {
                console.log(error);
                res.json({message: `Error: ${error}`})
            } else {
                console.log('Email Sent!')
                res.json({message: `Email Sent`})
            }
        });

        const email = new Email({
            email: req.body.html
        });
        try {
            const savedEmail = await email.save();
            res.json(savedEmail);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Delete Email
    app.delete('/email/:emailID', async (req, res) => {
        try {
            const removedEmail = await Email.deleteOne({_id: req.params.emailID});
            res.json(removedEmail)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
};

module.exports = email;
