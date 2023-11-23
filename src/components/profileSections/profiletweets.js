import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Tweets from '../tweets';
import axios from 'axios';

const ProfileTweets = ({user, setCurrentPage, changeTweetPopState}) => {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [tweets, setTweets] = useState([])
    const [retweets , setRetweets] = useState([])

    useEffect(() => {
        // Reset pageLoaded state
        setPageLoaded(false);
    
        // Fetch tweets
        axios.get(`http://localhost:3002/api/tweets/user/${user.username}`)
            .then(response => {
                setTweets(response.data);
            })
            .catch(error => {
                console.error('Error fetching tweets:', error);
            })
    
        // Fetch retweets
        axios.get(`http://localhost:3002/api/retweets/user/${user.username}`)
            .then(response => {
                // Update retweets state
                setRetweets(response.data);
            })
            .catch(error => {
                console.error('Error fetching retweets:', error);
            })
            .finally(() => {
                // Set pageLoaded to true when the request is completed
                setPageLoaded(true);
            });
    
    }, []);

    return (
        <Box>
            {pageLoaded && <Tweets tweets={tweets} setCurrentPage={setCurrentPage} retweets={retweets} changeTweetPopState={changeTweetPopState}/>}
        </Box>
    )
}

export default ProfileTweets