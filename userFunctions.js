import { readFile, writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

const LOGIN_DB_PATH = "./src/data/users.json";

// Garante que o diretório e arquivo existem ao iniciar
if (!existsSync('./src/data')) {
    mkdirSync('./src/data', { recursive: true });
}
if (!existsSync(LOGIN_DB_PATH)) {
    await writeFile(LOGIN_DB_PATH, '[]', 'utf-8');
}

export async function readDatabaseLogin() {
    try {
        const raw = await readFile(LOGIN_DB_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch(err) {
        // ❌ Antes: res.status(500) — res não existe aqui!
        // ✅ Agora: retorna array vazio se falhar
        console.error(`Erro ao ler banco de dados: ${err}`);
        return [];
    }
}

export async function atualizarScore(user) {
    user.score = (user.acertos) * 10 - (user.erros) * 5 + (user.dicas);
}

export async function acerto(nickname) {
    const users = await readDatabaseLogin();
    const user = users.find(u => u.nickname === nickname);
    if(user) {
        user.acertos += 1;
        atualizarScore(user);
    }
    await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

export async function erro(nickname) {
    const users = await readDatabaseLogin();
    const user = users.find(u => u.nickname === nickname);
    if(user) {
        user.erros += 1;
        atualizarScore(user);
    }
    await writeFile(LOGIN_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}