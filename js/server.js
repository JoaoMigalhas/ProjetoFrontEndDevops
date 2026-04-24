import express from 'express'
import cors from 'cors';

const APP = express();
const PORT = 3000;

APP.use(cors());

APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})