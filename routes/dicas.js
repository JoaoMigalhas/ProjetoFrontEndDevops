import { readFile, writeFile } from 'fs/promises';
import { Router } from 'express';
import * as userUtils from '../userFunctions.js';

const routes = Router();
const LOGIN_DB_PATH = "./src/assets/data/users.json";

routes.post('/api/dicas', async (req, res) => {
    const {nickname, contadorDicas, filmeSelecionado} = req.body;

    const raw = await readFile(LOGIN_DB_PATH, 'utf-8');
    const users = JSON.parse(raw);

    const usuarioEncontrado = users.find(u => u.nickname === nickname);

    if(usuarioEncontrado && usuarioEncontrado.dicas > 0) {
        //diminuindo a quantidade de dicas do usuário
        usuarioEncontrado.dicas -= 1;
        userUtils.atualizarScore(usuarioEncontrado);
        await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');

        //pegando a dica que o usuário requisitou

        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

export default routes;