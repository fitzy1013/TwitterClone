import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './mainFeeds/home';
import Explore from './mainFeeds/explore';
import Notifications from './mainFeeds/notifications';
import Profile from './mainFeeds/profile';
import Messages from './mainFeeds/messages';
import Bookmarks from './mainFeeds/bookmarks';

const MainContainer = ({ username, changeTweetPopState }) => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home username={username} changeTweetPopState={changeTweetPopState} />} />
        <Route path="/explore" element={<Explore username={username} />} />
        <Route path="/notifications" element={<Notifications username={username} />} />
        <Route path="/profile/:userID" element={<Profile username={username} changeTweetPopState={changeTweetPopState} />} />
        <Route path="/messages" element={<Messages username={username} />} />
        <Route path="/bookmarks" element={<Bookmarks username={username} />} />
      </Routes>
    </Container>
  );
};

export default MainContainer;
