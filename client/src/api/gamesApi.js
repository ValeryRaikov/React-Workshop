import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/games';

export const getAllGames = async () => {
    const result = await request.get(BASE_URL);

    const games = Object.values(result);

    return games;
} 

export const getExactGame = async (gameId) => request.get(`${BASE_URL}/${gameId}`);

export const create = (gameData) => request.post(BASE_URL, gameData);

export const remove = (gameId) => request.del(`${BASE_URL}/${gameId}`);

export const update = (gameId, gameData) => request.put(`${BASE_URL}/${gameId}`, gameData); 

const gamesAPI = {
    getAllGames,
    getExactGame,
    create,
    remove,
    update,
}

export default gamesAPI;