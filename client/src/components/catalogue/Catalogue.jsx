import GameListItem from './GameListItem';
import { useGetAllGames } from '../../hooks/useGames';

export default function Catalogue() {
    const [games, setGames] = useGetAllGames();

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