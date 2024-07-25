import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './mainFeeds/home';
import Explore from './mainFeeds/explore';
import Notifications from './mainFeeds/notifications';
import Profile from './mainFeeds/profile';
import Messages from './mainFeeds/messages';
import Bookmarks from './mainFeeds/bookmarks';
import SingleTweetView from './tweet/singleTweetView';

const MainContainer = ({ changeTweetPopState }) => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home changeTweetPopState={changeTweetPopState} />} />
        <Route path="/explore" element={<Explore  />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile/:userID" element={<Profile changeTweetPopState={changeTweetPopState} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tweet/:id" element={<SingleTweetView changeTweetPopState={changeTweetPopState}/>} />
      </Routes>
    </Container>
  );
};

export default MainContainer;
