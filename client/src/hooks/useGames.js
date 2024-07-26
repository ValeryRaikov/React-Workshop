import { useState, useEffect } from "react";
import gamesAPI, { getExactGame } from '../api/gamesApi';

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesAPI.getAllGames()
            .then(result => {
                // Add error handling logic...

                setGames(result)
            })
    }, []);

    return [games, setGames];
}

export function useGetExactGame(gameId) {
    const [game, setGame] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getExactGame(gameId);

            setGame(result);
        })();
    }, [gameId]);

    return [game, setGame];
}