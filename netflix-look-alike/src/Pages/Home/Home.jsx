import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import home_banner from "../../assets/hero_banner.jpg";
import home_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../Components/TitleCards/TitleCards";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="banner">
        <img src={home_banner} alt="" className="banner-img" />
        <div className="banner-caption">
          <img src={home_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the 
            city from an immortal enemy.
          </p>
          <div className="banner-btns">
            <button className="btn"><img src={play_icon} alt="" />Play</button>
            <button className="btn dark-btn"><img src={info_icon} alt="" />More Info</button>
          </div>
          <div className="title-card"><TitleCards /></div>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  )
}

export default Home;