import { readFile } from 'fs/promises';
import { Router } from 'express';

const routes = Router();
const LOGIN_DB_PATH = "./src/assets/data/users.json";

routes.post('/api/dicas', async (req, res) => {
    const {nickname} = req.body();

    let users = [];
    const read = await readFile(LOGIN_DB_PATH, 'utf-8');
    users = JSON.parse(read);

    const usuarioEncontrado = users.find(u => u.nickname === nickname);

    if(usuarioEncontrado) {
        usuarioEncontrado.dicas -= 1;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

export default routes;