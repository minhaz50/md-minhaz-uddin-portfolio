import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/gpt-3.jpg";
import IMG2 from "../../assets/mordern-fitness.jpg";
import IMG3 from "../../assets/profilecard.jpg";
import IMG4 from "../../assets/computer-parts.jpg";
import IMG5 from "../../assets/Portfolio3.png";
import IMG6 from "../../assets/Portfolio4.png";

const data = [
  {
    id: 1,
    image: IMG1,
    title: "HTML | CSS| ReactJs",
    github: "https://github.com/minhaz50/gpt-3",
    demo: "https://mordern-gpt3-site.netlify.app/",
    brief: "https://github.com/minhaz50/gpt-3/blob/main/README.md",
  },
  {
    id: 2,
    image: IMG2,
    title: "HTML | CSS | ReactJs | Bootstrap | Firebase",
    github: "https://github.com/minhaz50/mordern-fitness-care",
    demo: "https://mordern-fitness-care.netlify.app/",
    brief: "https://github.com/minhaz50/mordern-fitness-care#readme",
  },
  {
    id: 3,
    image: IMG3,
    title: "HTML | CSS Profile Card",
    github: "https://github.com/minhaz50/Profile-Card",
    demo: "https://profile-card-minhaz.netlify.app/",
    brief: "https://github.com/minhaz50/Profile-Card/blob/main/README.md",
  },
  {
    id: 4,
    image: IMG4,
    title: "React Brochure Site",
    github: "https://github.com/minhaz50/computer-parts-client-side",
    demo: "https://computer-parts-6a196.web.app/",
    brief: "https://github.com/Ade-mir/brochure-site/blob/main/README.md",
  },
  // {
  //   id: 5,
  //   image: IMG5,
  //   title: "JavaScript | HTML | CSS Portfolio",
  //   github: "https://github.com/Ade-mir/html-css-js-portfolio-tutorial-2",
  //   demo: "https://thriving-dragon-a3fcd9.netlify.app/",
  //   brief: "https://youtu.be/ldwlOzRvYOU",
  // },
  // {
  //   id: 6,
  //   image: IMG6,
  //   title: "JavaScript | HTML | CSS Animation Head",
  //   github: "https://github.com/Ade-mir/animated-head-portfolio",
  //   demo: "https://animated-head-portfolio.netlify.app/",
  //   brief: "https://youtu.be/pcFF_IIpMbc",
  // },
];

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container portfolio__container">
        {data.map(({ id, image, title, github, demo, brief }) => {
          return (
            <article key={id} className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a
                  href={github}
                  target="_blank"
                  className="btn"
                  rel="noreferrer"
                >
                  Github
                </a>
                <a
                  href={brief}
                  target="_blank"
                  className="btn"
                  rel="noreferrer"
                >
                  Project Brief
                </a>
              </div>
              <div className="portfolio__item-cta">
                <a
                  href={demo}
                  target="_blank"
                  className="btn btn-primary"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
