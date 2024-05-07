import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweets from '../tweets';


const ProfileLikes = ({user, setCurrentPage, changeTweetPopState}) => {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [tweets, setTweets] = useState([{}])
    const [tweetsLoaded, setTweetsLoaded] = useState(false)
    const [rendering, setRendering] = useState(false)

    console.log(user.username)
    console.log(tweets)

    const tweetProp = () => {
        const return_array = [...tweets]
        return return_array
    }

    useEffect(() => {
        setPageLoaded(false)
        axios.get(`http://localhost:3002/api/likes/tweetLikes/${user.username}`)
            .then(response => {
                console.log(response)
                setTweets(response.data)
                setPageLoaded(true)
            })
            .catch(error => {
                console.error('Error:', error);
              }); 
    },[])

    return (
        <Box>
            {pageLoaded && <Tweets tweets={[...tweets]} setCurrentPage={setCurrentPage} changeTweetPopState={changeTweetPopState}/>}
        </Box>
    )
}
export default ProfileLikes;