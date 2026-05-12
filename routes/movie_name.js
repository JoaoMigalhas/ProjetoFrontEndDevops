import { readFile } from 'fs/promises';
import { Router } from 'express';
import * as userUtils from '../userFunctions.js';
import * as movieUtils from '../movieFunctions.js';

const routes = Router();

//rota do sorteio do filme
routes.post('/api/filmeSorteado', async (req, res) => {
    const {id} = req.body;

    //lendo o banco de dados
    let movies = await movieUtils.readDatabaseMovie();

    //sorteando com algum filme para a variavel movies
    if(movies.some(m => m.id === id)) {
        return res.status(200).json({ nomeFilmeSorteado: movies[id].filme });
    } else {
        return res.status(400).json({ message: `erro com o numero ${id} sorteado`});
    }
});

//rota para validar se o filme inserido pelo usuário foi o correto
routes.post('/api/nomeFilme', async (req, res) => {
    const { filme, filmeSelecionado, nickname } = req.body;

    if(filmeSelecionado == filme) {
        userUtils.acerto(nickname);
        return res.json({message: 'resposta correta'}); //resposta temporária
    } else {
        userUtils.erro(nickname);
        return res.json({message: 'resposta incorreta'}); //resposta temporária
    }
});

export default routes;