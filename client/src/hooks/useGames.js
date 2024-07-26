import { useState, useEffect } from "react";
import gamesAPI from '../api/gamesApi';

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