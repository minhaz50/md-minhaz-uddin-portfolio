import React from "react";
import "./header.css";
import CTA from "./CTA";
import header_picture from "../../assets/header-image.png";
import HeaderSocials from "./HeaderSocials";

const header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Md Minhaz Uddin</h1>
        <h5 className="text-light">Front End Developer</h5>
        <CTA />
        <HeaderSocials />
        <div className="profile__image">
          <img src={header_picture} alt="Minhaz" />
        </div>
        <a href="#contact" className="scroll__down">
          Scroll Down →
        </a>
      </div>
    </header>
  );
};

export default header;
