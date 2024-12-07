import React from "react";
import "./Home.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import home_image from "../Assets/hero_image.png";

const Home = () => {
  return (
    <div className="home">
        <div className="home-left">
            <h2>New Arrivals</h2>
            <div>
                <div className="home-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="home-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="home-right">
            <img src={home_image} alt="" />
        </div>
    </div>
  )
}

export default Home;