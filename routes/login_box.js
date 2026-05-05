import {readFile, writeFile} from 'fs/promises';
import { Router } from 'express';

const routes = Router();
const LOGIN_DB_PATH = "./src/database/users.json";

routes.post('/api/login', async (req, res) => {
    const {nickname} = req.body;

    //validando o dado recebido agora pelo backend
    if(!/^[a-zA-Z0-9]{0,4}$/.test(nickname)) {
        return res.status(400).json({ message: `${nickname} inválido` });
    }

    if(typeof nickname != 'string') {
        return res.status(400).json({ message: "tipo de dado inválido" });
    }

    //lendo o banco de dados
    let nicks = [];
    try {
        //guardando os nomes já cadastrados dentro da variável nicks
        const raw = await readFile(LOGIN_DB_PATH, 'utf-8');
        nicks = JSON.parse(raw);
        } catch (err) {
            if (err.code == "ENOENT") {
                return res.status(500).json({ message: `erro ao ler o banco de dados: ${err}` });
            }
        }

        //se o nick já tiver sido cadastrado (condição aidna não implementada)
        if(nicks.some(u => u.nickname === nickname)) {
            return res.status(501).json({ message: 'condição de nickname válido ainda não implementado'});
        } else {
            //modelo de cadastro de novos usuários
            const newUser = {
                nickname: nickname,
                score: 0,
                acertos: 0,
                erros: 0,
                dicas: 3
            }

            nicks.push(newUser);

            //salvando no banco de dados o novo usuário
            try {
                await writeFile(LOGIN_DB_PATH, JSON.stringify(nicks, null, 2), 'utf-8');
                return res.status(201).json({ message: `${nickname} cadastrado com sucesso`});
            } catch (err) {
                return res.status(500).json({ message: `não foi possível cadastrar ${nickname}: ${err}`});
            }
        }
    });

export default routes;
