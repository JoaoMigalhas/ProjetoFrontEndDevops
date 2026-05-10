import { readFile } from 'fs/promises';
import { Router } from 'express';

const routes = Router();
const LOGIN_DB_PATH = "./src/assets/data/users.json";

//rota do sorteio do filme
routes.post('/api/filmeSorteado', async (req, res) => {
    const {id} = req.body;

})

//rota para validar se o filme inserido pelo usuário foi o correto
routes.post('/api/nomeFilme', async (req, res) => {
    const {filme} = req.body;

    
})

export default routes;