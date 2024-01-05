import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Productcarousel = () => {
return (
<>
<Carousel>
<Carousel.Item interval={2000}>
<img
className="produt1"
src={require("../images/accueil1.jpg")}
alt="product"
/>
<Carousel.Caption className="caption">
<h3 id="carouselh3">A decouvrir sans tarder pour Noel</h3>
<p>Notre gamme boulangerie</p>
</Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={2000}>
<img
id="produt2"
src={require("../images/accueil2.jpg")}
alt="product"
/>
<Carousel.Caption>
<h3 id="carouselh3">A decouvrir sans tarder pour Noel</h3>
<p>Notre gamme confiserie</p>
</Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={2000}>
<img
id="produt3"
src={require("../images/accueil3.jpg")}
alt="product"
/>
<Carousel.Caption>
<h3 id="carouselh3">A decouvrir sans tarder pour Noel</h3>
<p>Notre gamme chocolaterie</p>
</Carousel.Caption>
</Carousel.Item>
</Carousel>
</>
);
};

export default Productcarousel;
