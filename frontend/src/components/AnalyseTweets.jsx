import React, { useState } from "react";
import "../css/AnalyseTweets.css";

const AnalyseTweets = () => {
  const [text, setText] = new useState("");

  const [nooftweets, setNooftweets] = new useState("");
  const [tweets, setTweets] = new useState({});

  const [received,setReceived] = new useState(false)

  const fetchData = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        keyword: text,
        nooftweets: nooftweets,
      }),
    })
      .then((response) => response.json())
      .then((data) => setTweets(data))
      setReceived(true)
  };

  return (
    <div>
      <h1>ANALYSE TWEETS</h1>
      <div className="underline"></div>
      <form onSubmit={fetchData} className="form" action="/data" method="post">
        <p className="label">Enter Keyword: </p>
        <input
          type="text"
          id="keyword"
          className="input"
          name="keyword"
          placeholder="Keyword...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <br />
        <br />
        <p className="label">Enter no of tweets: </p>
        <input
          type="text"
          id="nooftweets"
          className="input"
          name="nooftweets"
          placeholder="No of keywords...."
          value={nooftweets}
          onChange={(e) => setNooftweets(e.target.value)}
        />
        <input type="submit" className="btn btn3" value="ANALYSE" />
        {/* <a href="/home"><div className="btn back">BACK</div></a> */}
      </form>
      {received  && <div className="tweets"><p>POSITIVE: {tweets.positive}</p>
      <p>NEGATIVE   : {tweets.negative}</p>
      <p>NEUTRAL    : {tweets.neutral}</p>
      <p>POSTIVE %  : {tweets.pos_percent}</p>
      <p>NEGATIVE % : {tweets.neg_percent}</p>
      </div>}
      
    </div>
  );
};

export default AnalyseTweets;
