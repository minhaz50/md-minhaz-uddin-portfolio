import React from "react";
import "./about.css";
import profile_picture from "../../assets/img.png";
// import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={profile_picture} alt="about" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Education</h5>
              <small>
                {" "}
                National Institute Of Technology, Tiruchirappalli, India
                (B.Tech)
              </small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>
                15+ Completed
                <br />
                and Counting
              </small>
            </article>
            {/* <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>Complete Web Development Course With Jhankar Mahbub</small>
            </article> */}
          </div>
          <p>
            Hello there! 👋 I'm Md Minhaz Uddin, a creative and detail-oriented
            frontend developer. With a strong background in HTML, CSS,
            JavaScript, ReactJs familiarity with back-end technologies such as
            NodeJS, ExpressJS, MongoDB. I specialize in translating design
            concepts into interactive and responsive websites and web
            applications.
          </p>
          <p>
            I am fascinated by the intersection of technology and creativity.
            Frontend development allows me to blend my technical skills with my
            love for design, enabling me to build digital products that not only
            function flawlessly but also captivate users. I believe that
            user-centric design is key to making a lasting impact in the digital
            landscape.
          </p>
          <p>
            I'm always open to new opportunities, collaborations, and
            challenges.
          </p>
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
