const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded());

app.use(express.json());

// CORS
app.use(cors());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    //Checking a content-type header in the request so we can handle JSON without errors from req.body
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server requires application/json');
    } else {
        next();
    };
});

const videosRoutes = require('./routes/videosRoutes');

app.use('/videos', videosRoutes);

app.get('/', function (_req, res) {
    res.send('Welcome to BrainFlix!');
});

app.listen(process.env.PORT, error => error ? console.error(error) : console.info(`BrainFlix server:  Listening on port ${process.env.PORT}`));
// console.log(process.env);
