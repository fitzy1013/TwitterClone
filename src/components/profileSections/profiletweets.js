import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Tweets from '../tweets';
import axios from 'axios';

<<<<<<< HEAD
const ProfileTweets = ({user, setCurrentPage, changeTweetPopState}) => {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [tweets, setTweets] = useState([])
    const [retweets, setRetweets] = useState([])

    console.log(tweets)
    console.log(retweets)
=======
const ProfileTweets = ({user, setCurrentPage}) => {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [tweets, setTweets] = useState([])
>>>>>>> 425f016a9c4d16b4f1c8160c55f3e35c97edb32c

    useEffect(() => {
        setPageLoaded(false)
        axios.get(`http://localhost:3002/api/tweets/user/${user.username}`)
            .then(response => {
                setTweets(response.data)
<<<<<<< HEAD
=======
                setPageLoaded(true)
>>>>>>> 425f016a9c4d16b4f1c8160c55f3e35c97edb32c
            })
            .catch(error => {
                console.error('Error:', error);
              }); 
<<<<<<< HEAD
        axios.get(`http://localhost:3002/api/retweets/user/${user.username}`)
              .then(response => {
                setRetweets(response.data)
                setPageLoaded(true)
              })
              .catch(error => {
                console.error('Error:', error);
              })
=======
>>>>>>> 425f016a9c4d16b4f1c8160c55f3e35c97edb32c
    },[])

    return (
        <Box>
<<<<<<< HEAD
            {pageLoaded && <Tweets tweets={tweets} setCurrentPage={setCurrentPage} retweets={retweets} changeTweetPopState={changeTweetPopState}/>}
=======
            {pageLoaded && <Tweets tweets={tweets} setCurrentPage={setCurrentPage}/>}
>>>>>>> 425f016a9c4d16b4f1c8160c55f3e35c97edb32c
        </Box>
    )
}

export default ProfileTweets