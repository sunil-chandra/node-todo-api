var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// Initialize Express App
var app = express();

// Intercept request via Bodyparser to convert to JSON
app.use(bodyParser.json());

// Route for Posting Todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Route for Fetching all Todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
})

// Initialize server and start listening on port 3000
app.listen(3000, () => {
    console.log('Started server on port 3000');
});

// Export app for Mocha testing
module.exports = { app };