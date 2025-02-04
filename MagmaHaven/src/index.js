import express from 'express';
import router from './routes.js';

const app = express();

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(router)

app.listen(3000, ()=>console.log('Listening on http://localhost:3000'))