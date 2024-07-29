import { useEffect, useState } from "react";
import commentsAPI from "../api/commentsApi"

export function useCreateCommnet() {
    const createHandler = (gameId, comment) => {
        commentsAPI.createComment(gameId, comment)
    }

    return createHandler;
}

export function useGetAllComments(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (
            async () => {
                const result = await commentsAPI.getAllComments(gameId);

                setComments(result);
            })();
    }, [gameId]);

    return [comments, setComments];
}