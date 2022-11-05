'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import routes from './routes/cotizacion_reglas.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200   
}

app.use(cors(corsOptions));
app.use(routes)

app.listen(config.port, ()=>{
    console.info('App is listening on url '+ config.url+' in PORT '+config.port)
})