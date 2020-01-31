const express = require('express');
const messenger = require('./app/messenger');
const app = express();

const port = 8000;

app.use(express.json());
app.use('/messages', messenger);

app.listen(port, () => {
    console.log('Server started on port: ' + port)
});
