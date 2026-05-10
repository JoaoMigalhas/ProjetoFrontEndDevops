import { readFile } from 'fs/promises';
import { Router } from 'express';

const routes = Router();
const LOGIN_DB_PATH = "./src/assets/data/users.json";

routes.get('/api/nomeFilme', async (req, res) => {
    const {filme} = req.body;

    
})

export default routes;