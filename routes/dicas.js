import { readFile, writeFile } from 'fs/promises';
import { Router } from 'express';
import * as userUtils from '../userFunctions.js';
import * as movieUtils from '../movieFunctions.js';


const routes = Router();
const LOGIN_DB_PATH = "./src/data/users.json";
const MOVIE_DB_PATH = "./src/data/movies.json";

routes.post('/api/dicaInicial', async (req, res) => {
    const {objFilmeSorteado} = req.body;
    
    const dica = objFilmeSorteado.dica[0];
    res.status(200).json({ dicaInicial: dica });
});

routes.post('/api/dicas', async (req, res) => {
    const {nickname, contadorDicas, objFilmeSorteado} = req.body;

    const users = await userUtils.readDatabaseLogin();

    const usuarioEncontrado = users.find(u => u.nickname === nickname);

    if(usuarioEncontrado && usuarioEncontrado.dicas > 0) {
        //diminuindo a quantidade de dicas do usuário
        usuarioEncontrado.dicas -= 1;
        userUtils.atualizarScore(usuarioEncontrado);
        await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');

        const dicaSelecionada = objFilmeSorteado.dica[contadorDicas];
        res.status(200).json({ dica: dicaSelecionada });
    } else {
        res.sendStatus(400); //dará bad request se o usuário não ter mais dicas disponíveis
    }
});

export default routes;