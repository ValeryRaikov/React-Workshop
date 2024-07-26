import requester from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

const createComment = async (gameId, username, text) =>  await requester.post(`${BASE_URL}/${gameId}/comments`, { username, text });

const getAllComments = async (gameId) => {
    const result = await requester.get(`${BASE_URL}/${gameId}/comments`);

    const comments = Object.values(result);

    return comments;
}

const commentsAPI = {
    createComment,
    getAllComments,
}

export default commentsAPI;