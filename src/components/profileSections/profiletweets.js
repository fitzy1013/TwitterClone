import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Tweets from '../tweets';
import axios from 'axios';

const ProfileTweets = ({user, setCurrentPage}) => {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        setPageLoaded(false)
        axios.get(`http://localhost:3002/api/tweets/user/${user.username}`)
            .then(response => {
                setTweets(response.data)
                setPageLoaded(true)
            })
            .catch(error => {
                console.error('Error:', error);
              }); 
    },[])

    return (
        <Box>
            {pageLoaded && <Tweets tweets={tweets} setCurrentPage={setCurrentPage}/>}
        </Box>
    )
}

export default ProfileTweets