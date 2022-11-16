import React from "react";
import "../css/Home.css";
import twitter from "../images/twitter.jpg";
import Navbar from "./Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import facebook from "../images/icons8-facebook-48.png"
import instagram from "../images/icons8-instagram-48.png"
import linkedin from "../images/icons8-linkedin-circled-48.png"
import {useEffect} from 'react'


const Home = () => {

  

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="cont">
          <h2 className="head">SENTIMENT ANALYSIS</h2>
          <div className="under"></div>
          <p className="para">
            Sentiment analysis (also known as opinion mining or emotion AI) is
            the use of natural language processing, text analysis, computational
            linguistics, and biometrics to systematically identify, extract,
            quantify, and study affective states and subjective information.
            Sentiment analysis is widely applied to voice of the customer
            materials such as reviews and survey responses, online and social
            media, and healthcare materials for applications that range from
            marketing to customer service to clinical medicine.
          </p>
        </div>
        <img src={twitter} className="twitter" />
      </div>
      <center>
        <a href="/analysetweets"><button className="btn btn-primary btn2">Analyse Tweets</button></a>
      </center>
      
      <div className="footer">
        <img src={facebook} className="facebook" /> 
        <img src={instagram} className="instagram" />
        <img src={linkedin} className="linkedin" />
      </div>
    </div>
  );
};

export default Home;
