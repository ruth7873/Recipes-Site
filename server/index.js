const express = require('express');
const cors = require('cors');
const api = require('./routes/api');


const app = express();
app.use(express.json());

const port = 8080;

app.use(cors())


app.use('/api',api)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})