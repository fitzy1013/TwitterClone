import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tweet from "./tweet";

const SingleTweetView = ({ changeTweetPopState }) => {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/tweets/${id}`)
      .then((response) => {
        setTweet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tweet:", error);
      });
  }, [id]);

  if (!tweet) return <div>Loading...</div>;

  return (
    <div>
      <Tweet tweet={tweet} changeTweetPopState={changeTweetPopState} />
    </div>
  );
};

export default SingleTweetView;
