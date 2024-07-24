import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Catalogue from './components/catalogue/Catalogue';
import CreateGame from './components/createGame/CreateGame';
import DetailsGame from './components/detailsGame/DetailsGame';

function App() {
    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/all-games' element={<Catalogue />} />
                    <Route path='/all-games/:gameId/details' element={<DetailsGame />} />
                    <Route path='/create-game' element={<CreateGame />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
