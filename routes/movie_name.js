import { readFile } from 'fs/promises';
import { Router } from 'express';
import * as scoreUtils from './score.js';

const routes = Router();
const MOVIE_DB_PATH = "./src/assets/data/movies.json";

//rota do sorteio do filme
routes.post('/api/filmeSorteado', async (req, res) => {
    const {id} = req.body;

    //lendo o banco de dados
    try {
        let movies = [];
        const read =  await readFile(MOVIE_DB_PATH, 'utf-8');
        movies = JSON.parse(read);

        //sorteando com algum filme para a variavel movies
        if(movies.some(m => m.id === id)) {
            return res.status(200).json({ filmeSorteado: movies[id].filme });
        } else {
            return res.status(400).json({ message: `erro com o numero ${id} sorteado`});
        }
        } catch (err) {
            if(err.code == "ENOENT") {
                return res.status(500).json({ message: `erro ao ler o banco de dados: ${err}` });
            }
        }
});

//rota para validar se o filme inserido pelo usuário foi o correto
routes.post('/api/nomeFilme', async (req, res) => {
    const { filme, respostaCorreta, nickname } = req.body;

    if(respostaCorreta === filme) {
        scoreUtils.acerto(nickname);
        return res.json({message: 'resposta correta'}); //resposta temporária
    } else {
        scoreUtils.erro(nickname);
        return res.json({message: 'resposta incorreta'}); //resposta temporária
    }
});

export default routes;