import React from "react";
import "../css/DefaultPage.css";
import ml1 from "../images/ml1.jpg";
import ml2 from "../images/ml2.jpg";
import ml3 from "../images/ml3.jpg";
import ml4 from "../images/ml4.jpg";
import twitter from "../images/twitter-log.png";
import { Carousel } from "react-responsive-carousel";

const DefaultPage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <div className="logo-cont">
            <img src={twitter} className="logo" />
            <h2 className="header2">Twitter Sentiment Analysis</h2>
          </div>
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <div className="btn-container">
              <a href="/signup">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 btn4"
                  type="submit"
                >
                  Sign-Up
                </button>
              </a>
              <a href="/login">
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  Sign-in
                </button>
              </a>
            </div>
          </ul>
        </div>
      </nav>
      <div class="stage">
        <div class="box bounce-1">Sign-Up or Sign-In to continue</div>
      </div>
      <center>
        <div className="carousel-wrapper carImg">
          <Carousel infiniteLoop useKeyboardArrows autoPlay>
            <div interval={300}>
              <img src={ml1} />
            </div>
            <div interval={300}>
              <img src={ml2} />
            </div>
            <div interval={300}>
              <img src={ml3} />
            </div>
            <div interval={300}>
              <img src={ml4} />
            </div>
          </Carousel>
        </div>
      </center>
    </div>
  );
};

export default DefaultPage;
