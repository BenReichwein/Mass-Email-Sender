const contacts = require('./contacts');
const user = require('./user');
const email = require('./email')

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes:</h1><br/>
        <p>POST: /user/signup (create user)</p><br/>
        <p>POST: /user/login (logs in user)</p><br/>
        <p>PATCH: /user/:id (UPDATE user info)</p><br/>
        <p>GET: /user/:userID (GET user info)</p><br/>
        <p>POST: /user/logout (logs out user, and expires token)</p><br/>
        <p>GET: /contacts (GET all posts)</p><br/>
        <p>POST: /contacts (POST in json with "name":"", "email":"")</p><br/>
        <p>GET: /contacts/:contactsID (GET specific post)</p><br/>
        <p>DELETE: /contacts/:contactsID (DELETE post)</p><br/>
        <p>PATCH: /contacts/:contactsID (UPDATE post)</p><br/>`);
        res.end();
    })
    // Routes
    contacts(app);
    user(app);
    email(app);
}

module.exports = appRouter;