import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import Catalogue from './components/catalogue/Catalogue';
import CreateGame from './components/createGame/CreateGame';
import DetailsGame from './components/detailsGame/DetailsGame';
import EditGame from './components/editGame/EditGame';
import { AuthContextProvider } from './contexts/AuthContext';
import PrivateGuard from './components/common/PrivateGuard';

function App() {
    return (
        <AuthContextProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/all-games' element={<Catalogue />} />
                        <Route path='/all-games/:gameId/details' element={<DetailsGame />} />
                        <Route element={<PrivateGuard />}>
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/all-games/:gameId/edit' element={<EditGame />} />
                            <Route path='/create-game' element={<CreateGame />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </AuthContextProvider>
    );
}

export default App;
