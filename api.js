const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = express();
const port = 3000;
const router = express.Router();

const galleryRouter = require('./router/galleryRouter');

api.use(cors());

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json({limit: '20mb', extended: true}));

api.use('/public', express.static(__dirname+'/public'));

router.get('/', (req, res) => {
    res.json({messagem: '=> API Online...'})
})

api.use('/', router);
api.use('/gallery', galleryRouter);
api.listen(port);
console.log('Run API Express');