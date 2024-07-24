import { useEffect, useState } from 'react';

import * as gamesAPI from '../../api/gamesApi';

import GameListItem from './GameListItem';

export default function Catalogue() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesAPI.getAllGames()
            .then(result => {
                // Add error handling logic...

                setGames(result)
            })
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0 
                ? games.map(game => <GameListItem key={game._id} {...game} />)
                : <h3 className="no-articles">No games yet</h3>
            }
            </section>
    );
}