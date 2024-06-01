import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Library from './Library';
import Feed from './Feed';
import Trending from './Trending';
import Player from './Player';
import Favourites from './Favourites';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Login from './Login';
import { setClientToken } from '../spotify';

export default function Home() {
    const [token, setToken] = useState("");
    useEffect(() => {
        const _token = window.localStorage.getItem("token");  // so that on every useeffect u donot have to check it and simply take from the localStorage
        const hash = window.location.hash;  // window.location gives the current path and hash gives the value associated to the hash part of location
        //console.log(hash.split("&")[0].split("=")[1]); To get the access token after loging in
        window.location.hash = ""; // clear it after storing so not visible on link
        if (!_token && hash) {
            const token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", token);
            setToken(token);
            setClientToken(token);
        }
        else{
            setToken(_token);
            setClientToken(_token);
        }
    }, [])
    return (
        !token ? (
            <Login />
        ) : (
            <BrowserRouter>
                <div className='main-body'>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Library />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/player" element={<Player />} />
                        <Route path="/favourites" element={<Favourites />} />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    )
}
