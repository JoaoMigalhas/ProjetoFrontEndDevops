import { readFile } from 'fs/promises';
import { Router } from 'express';
import * as userUtils from '../userFunctions.js';
import * as movieUtils from '../movieFunctions.js';

const routes = Router();

//rota do sorteio do filme
routes.get('/api/filmeSorteado', async (req, res) => {
    const movie = await movieUtils.sortearFilme();
    if(movie) {
        res.status(200).json({ objFilmeSorteado: movie });
    } else {
        res.sendStatus(404);
    }
});

//rota para validar se o filme inserido pelo usuário foi o correto
routes.post('/api/nomeFilme', async (req, res) => {
    const { filme, objFilmeSorteado, nickname } = req.body;

    if(objFilmeSorteado.filme == filme) {
        userUtils.acerto(nickname);
        return res.json({message: 'resposta correta'}); //resposta temporária
    } else {
        userUtils.erro(nickname);
        return res.json({message: 'resposta incorreta'}); //resposta temporária
    }
});

//rota para retornar os filmes da aplicação
routes.get('/api/filmes', async (req, res) => {
    const data = await movieUtils.readDatabaseMovie();

    let filmes = [];
    for(const nomeFilme of data) {
        filmes.push(nomeFilme.filme);
    }

    res.status(200).json({ filmes: filmes });
});

export default routes;