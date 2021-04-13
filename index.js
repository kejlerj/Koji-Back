const express = require('express');
const cors = require('cors');
const api = require('./routes/api');

try {
    let app = express();
    app.use(cors());

    // Add routes
    app.use(('/', api));

    // Start server
    app.listen(process.env.PORT || 8080);

    console.log('listening on ' + (process.env.PORT || 8080));
} catch (err) {
    console.log(err);
    res.status(400).send();
}
