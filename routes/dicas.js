import { readFile, writeFile } from 'fs/promises';
import { Router } from 'express';
import * as userUtils from '../userFunctions.js';
import * as movieUtils from '../movieFunctions.js';


const routes = Router();
const LOGIN_DB_PATH = "./src/data/users.json";
const MOVIE_DB_PATH = "./src/data/movies.json";

routes.post('/api/dicaInicial', async (req, res) => {
    const {filmeSelecionado} = req.body;
    const data = await movieUtils.readDatabaseMovie();
    
    const objFilme = data.find(f => f.filme == filmeSelecionado);
    const dica = objFilme.dica[0];
    res.status(200).json({ dicaInicial: dica });
});

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
        const filmes = await movieUtils.readDatabaseMovie();

        //resgatando o objeto inteiro do filme selecionado
        const objFilmeSelecionado = filmes.find(f => f.filme == filmeSelecionado);
        //resgatando a dica com base em quantas dicas o usuário já requisitou no front-end
        const dicaSelecionada = objFilmeSelecionado.dica[contadorDicas];
        res.status(200).json({ dica: dicaSelecionada });
    } else {
        res.sendStatus(400); //dará bad request se o usuário não ter mais dicas disponíveis
    }
});

export default routes;