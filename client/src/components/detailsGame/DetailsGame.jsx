import { useEffect, useState } from "react";
import { getExactGame } from "../../api/gamesApi";
import { useParams } from "react-router-dom";
import commentsApi from "../../api/commentsApi";

export default function DetailsGame() {
    const [game, setGame] = useState({});
    const [username, setUsername] = useState('');
    const [newComment, setNewComment] = useState('');
    const { gameId } = useParams();

    useEffect(() => {
        (async () => {
            const result = await getExactGame(gameId);

            setGame(result);
        })();
    });

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        await commentsApi.createComment(gameId, username, newComment);

        setGame(prevGame => ({
            ...prevGame,
            comments: {
                ...prevGame.comments,
                [newComment._id]: newComment,
            }
        }));

        setUsername('');
        setNewComment('');
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                <img className="game-img" src={game.imageUrl} />
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.category}</p>
                </div>
                <p className="text">
                {game.summary}
                </p>
                <div className="details-comments">
                <h2>Comments:</h2>
                <ul>
                    {game.comments && Object.values(game.comments)?.map(comment => (
                        <li className="comment" key={comment._id}>
                        <p>{comment.username}: {comment.text}</p>
                        </li>
                    ))}
                </ul>
                {Object.keys(game.comments || {}).length === 0
                    ? <p className="no-comment">No comments.</p>
                    : ''
                }
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                <a href="#" className="button">
                    Edit
                </a>
                <a href="#" className="button">
                    Delete
                </a>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <textarea 
                    name="comment" 
                    placeholder="Comment......" 
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                />
                <input className="btn submit" type="submit" defaultValue="Add Comment" />
                </form>
            </article>
            </section>
    );
}