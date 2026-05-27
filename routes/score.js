import * as userUtils from '../userFunctions.js';
import { Router } from 'express';

const routes = Router();

routes.get('/api/scoreUsers', async (req, res) => {
    let usuarios = await userUtils.readDatabaseLogin();

    //ordenação bubbleSort
    res.status(200).json({ dados: usuarios });
})
export default routes;