import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweets from '../tweets';
import { useNavigate } from 'react-router-dom';



const ProfileLikes = ({ user, changeTweetPopState }) => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    console.log(user.username);
    console.log(tweets);

    useEffect(() => {
        setPageLoaded(false);
        axios.get(`http://localhost:3002/api/likes/user/${user.username}`)
            .then(response => {
                console.log(response);
                setTweets(response.data);
                setPageLoaded(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [user.username]);

    return (
        <Box>
            {pageLoaded && <Tweets tweets={tweets.tweets} navigate={navigate} changeTweetPopState={changeTweetPopState} />}
        </Box>
    );
};

export default ProfileLikes;
