import { Router } from 'express'
import * as movieUtils from '../movieFunctions.js';

const routes = Router();

routes.get('/api/sortearNovoFilme', async (req, res) => {
    const novoFilmeSorteado = movieUtils.sortearFilme();

    res.json({ novoFilmeSorteado: novoFilmeSorteado});
})

export default routes;