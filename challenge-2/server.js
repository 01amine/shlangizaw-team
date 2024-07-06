const express = require('express');
const app = express();

app.use('/api/files', require('./routes/fileRoutes.js'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("in port", port);
})