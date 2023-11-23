import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Home from './mainFeeds/home';
import Explore from './mainFeeds/explore';
import Notifications from './mainFeeds/notifications';
import Profile from './mainFeeds/profile';
import Messages from './mainFeeds/messages';
import Bookmarks from './mainFeeds/bookmarks';

const MainContainer = ({currentPage, username, setCurrentPage, changeTweetPopState}) => {
    const [altUsername, setAltUsername] = useState(null)

    const changeAltUsername = (alt) => {
        setAltUsername(alt)
    }

    return (
        <Container>
            {(currentPage == "Home") && <Home username={username} setCurrentPage={setCurrentPage} changeTweetPopState={changeTweetPopState}/>}
            {(currentPage == "Explore") && <Explore username={username}/>}
            {(currentPage == "Notifications") && <Notifications username={username}/>}
            {(currentPage == "Profile") && <Profile altUsername={altUsername} username={username} changeAltUsername={changeAltUsername} setCurrentPage={setCurrentPage} changeTweetPopState={changeTweetPopState}/>}
            {(currentPage == "Messages") && <Messages username={username}/>}
            {(currentPage == "Bookmarks") && <Bookmarks username={username}/>}
        </Container>
    )
}

export default MainContainer;
