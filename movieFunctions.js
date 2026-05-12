import {readFile, writeFile} from 'fs/promises';

const MOVIE_DB_PATH = "./src/data/movies.json";

export async function readDatabaseMovie() {
    try {
        const raw = await readFile(MOVIE_DB_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch(err) {
        if(err.code == 'ENOENT') {
            return res.status(500).json({ message: `erro ao ler o banco de dados: ${err}` });
        }
    }
}