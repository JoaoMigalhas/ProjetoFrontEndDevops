import express from 'express'
import cors from 'cors';

const app = express();
const PORT = 3000;

//middlewares
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

//rotas
import loginRoute from './routes/login_box.js';
app.use(loginRoute);

import movieName from './routes/movie_name.js';
app.use(movieName);

import dicas from './routes/dicas.js';
app.use(dicas);

import score from './routes/score.js';
app.use(score);

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`)});