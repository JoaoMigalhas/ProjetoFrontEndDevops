import express from 'express'
import cors from 'cors';

const app = express();
const PORT = 3000;

//middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.JSON());

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`)});