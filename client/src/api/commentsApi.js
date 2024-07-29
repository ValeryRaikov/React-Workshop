import requester from './requester';

const BASE_URL = 'http://localhost:3030/data/comments';

const createComment = (gameId, text) => requester.post(BASE_URL, { gameId, text });

const getAllComments = (gameId) => {
    const params = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `user=_owenrId:users`,
    });

    return requester.get(`${BASE_URL}?${params.toString()}`);
}

const commentsAPI = {
    createComment,
    getAllComments,
}

export default commentsAPI;