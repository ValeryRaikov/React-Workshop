import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated } = useAuthContext();

    return (
        <header>
            <h1>
                <NavLink 
                    className="home" 
                    to="/" 
                    style={({ isActive}) => isActive ? {color: 'yellow'} : {}}
                >
                GamesPlay
                </NavLink>
            </h1>
            <nav>
                <NavLink to="/all-games" style={({ isActive}) => isActive ? {color: 'yellow'} : {}}>All games</NavLink>
                {isAuthenticated 
                ? (<div id="user">
                    <NavLink to="/create-game" style={({ isActive}) => isActive ? {color: 'yellow'} : {}}>Create Game</NavLink>
                    <NavLink to="/logout" style={({ isActive}) => isActive ? {color: 'red'} : {}}>Logout</NavLink>
                    </div>
                )
                : (<div id="guest">
                    <NavLink to="/login" style={({ isActive}) => isActive ? {color: 'green'} : {}}>Login</NavLink>
                    <NavLink to="/register" style={({ isActive}) => isActive ? {color: 'green'} : {}}>Register</NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}