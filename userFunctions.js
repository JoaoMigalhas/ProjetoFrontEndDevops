import {readFile, writeFile} from 'fs/promises';

const LOGIN_DB_PATH = "./src/assets/data/users.json";

export async function readDatabaseLogin() {
    try {
        const raw = await readFile(LOGIN_DB_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch(err) {
        if(err.code == 'ENOENT') {
            return res.status(500).json({ message: `erro ao ler o banco de dados: ${err}` });
        }
    }
}

export async function atualizarScore(user) {
    user.score = (user.acertos) * 10 - (user.erros) * 5 + (user.dicas);
}

export async function acerto(nickname) {
    const users = await readDatabase();
 
    const user = users.find(u => u.nickname === nickname);

    if(user) {
        user.acertos += 1;
        atualizarScore(user);
    }

    await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

export async function erro(nickname) {
    const users = await readDatabase();
    
    const user = users.find(u => u.nickname === nickname)

    if(user) {
        user.erros += 1;
        atualizarScore(user);
    }

    await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}