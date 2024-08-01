import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetExactGame } from "../../hooks/useGames";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreateCommnet, useGetAllComments } from "../../hooks/useComments";
import gamesAPI from "../../api/gamesApi";

const initialValues = {
    comment: '',
}

export default function DetailsGame() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game] = useGetExactGame(gameId);
    const [comments, setComments] = useGetAllComments(gameId);
    const createComment = useCreateCommnet();
    const { email, userId } = useAuthContext();
    const { isAuthenticated } = useAuthContext();
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);

            setComments(prevComments => [...prevComments, newComment]);
        } catch (err) {
            console.error(err.message);
        }
    });

    const isOwner = userId === game._ownerId;

    const gameDeleteHandler = async () => {
        // Add delete confirmation logic
        try {
            await gamesAPI.remove(gameId);

            navigate('/');
        } catch (err) {
            console.error(err.message);
        }
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
                    {comments.map(comment => (
                        <li className="comment" key={comment._id}>
                        <p>{comment.user.username}: {comment.text}</p>
                        </li>
                    ))}
                </ul>
                {comments.length === 0 && <p className="no-comment">No comments.</p>}
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner && (
                    <div className="buttons">
                        <Link 
                            to={`/all-games/:${gameId}/edit`}
                            className="button"
                        >
                            Edit
                        </Link>
                        <a 
                            href="#" 
                            className="button"
                            onClick={gameDeleteHandler}
                        >
                            Delete
                        </a>
                    </div>
                )}
            </div>
            {/* Bonus */}
            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={submitHandler}>
                    <textarea 
                        name="comment" 
                        placeholder="Comment......" 
                        onChange={changeHandler}
                        value={values.comment}
                    />
                    <input className="btn submit" type="submit" defaultValue="Add Comment" />
                    </form>
                </article>
            )}

        </section>
    );
}