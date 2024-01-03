import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <>
      <div className="boxparentfooter">

        <span className="boxchildrenfooter1">
          <h1 id="titlefooter">CHOCO PAP</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dicta vel alias, quo est minima distinctio non temporibus. Expedita voluptatibus dolorem minus praesentium facere ea porro obcaecati consectetur iste? Ipsum! </p>
        </span>

        <span className="boxchildrenfooter2">
          <h1 id="titlefooter">CONTACT</h1>
          <p>Adresse : 51 rue du chocolat 75000 Paris </p>
          <p>Téléphone: 01 23 45 67 89 </p>
          <p>Horaires: 9h00-17h00 du Lundi au vendredi</p>
        </span>
        <div className="socialnetworkfooter">
          <img
            id="fb1"
            src={require("../images/logo-facebook.png")}
            alt="product"
          />
          <img
            id="inst1"
            src={require("../images/logo-instagram.jpeg")}
            alt="product"
          />
          <img
            id="x1"
            src={require("../images/logo-twitter.png")}
            alt="product"
          />
        </div>
      </div>
    </>
  );
}
