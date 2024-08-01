import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useGetExactGame } from '../../hooks/useGames';
import gamesAPI from '../../api/gamesApi';

const initialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
}

export default function EditGame() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useGetExactGame(gameId);

    const {
        changeHandler,
        submitHandler,
        values,
    } = useForm(Object.assign(initialValues, game), async (values) => {
        const updatedGaem = await gamesAPI.update(gameId, values);

        setGame(updatedGaem);
        navigate(`/all-games/${gameId}/details`);
    });

    return (

        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={submitHandler}>
                <div className="container">
                <h1>Edit Game</h1>
                <label htmlFor="leg-title">Legendary title:</label>
                <input 
                    onChange={changeHandler} 
                    value={values.title} 
                    type="text" 
                    id="title" 
                    name="title" 
                />
                <label htmlFor="category">Category:</label>
                <input 
                    onChange={changeHandler} 
                    value={values.category} 
                    type="text" 
                    id="category" 
                    name="category"
                />
                <label htmlFor="levels">MaxLevel:</label>
                <input
                    onChange={changeHandler} 
                    value={values.maxLevel}
                    type="number"
                    id="maxLevel"
                    name="maxLevel"
                    min={1}
                    defaultValue=""
                />
                <label htmlFor="game-img">Image:</label>
                <input 
                    onChange={changeHandler} 
                    value={values.imageUrl} 
                    type="text" 
                    id="imageUrl" 
                    name="imageUrl" 
                />
                <label htmlFor="summary">Summary:</label>
                <textarea 
                    onChange={changeHandler} 
                    value={values.summary} 
                    name="summary" 
                    id="summary" 
                />
                <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
            </section>
    );
}