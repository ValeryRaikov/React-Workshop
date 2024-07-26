import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

export const getAllGames = async () => {
    const result = await request.get(BASE_URL);

    const games = Object.values(result);

    return games;
} 

export const getExactGame = async (gameId) => request.get(`${BASE_URL}/${gameId}`);

const gamesAPI = {
    getAllGames,
    getExactGame,
}

export default gamesAPI;