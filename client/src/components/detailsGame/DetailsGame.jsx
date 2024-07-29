import { useParams } from "react-router-dom";
import { useGetExactGame } from "../../hooks/useGames";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreateCommnet, useGetAllComments } from "../../hooks/useComments";

const initialValues = {
    comment: '',
}

export default function DetailsGame() {
    const { gameId } = useParams();
    const [game] = useGetExactGame(gameId);
    const [comments, setComments] = useGetAllComments(gameId);
    const createComment = useCreateCommnet();
    const { isAuthenticated } = useAuthContext();
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, ({ comment }) => {
        createComment(gameId, comment);
    });

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
                        <p>{comment.username}: {comment.text}</p>
                        </li>
                    ))}
                </ul>
                {comments.length === 0 && <p className="no-comment">No comments.</p>}
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