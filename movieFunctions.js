import { readFile } from 'node:fs/promises';

const MOVIE_DB_PATH = "./src/data/movies.json";

//leitura do banco de dados de filmes
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

//função para sortear um filme no back-end
export async function sortearFilme() {
    //lendo o banco de dados
    let movies = await readDatabaseMovie();

    const id = Math.floor(Math.random() * movies.length);

    //sorteando com algum filme para a variavel movies
    return movies[id];
};