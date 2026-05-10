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

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`)});