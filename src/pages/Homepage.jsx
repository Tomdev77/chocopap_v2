import React from "react";
import "../styles/App.css";
import "../styles/contact.css";
import Productcarousel from "../components/Productcarousel";
import GoogleMap from "../components/GoogleMap";

// PREMIERE PAGE PRESENTATION HP

export default function Homepage() {
return (
<>
<h1 className="titlehp">CHOCOPAP</h1>
<a href="/boutique"><h2 className="hpbutt"></h2></a><br/><br/><br/>
<Productcarousel />
<h1 id="contacttitle">Les tendances du moment </h1>
<address className="adresscontainer">
<p id="findUs"> Venez nous retrouver sur Paris pour un évenement gustatif, chaque Vendredi</p>
<p id="findUs">Pour plus d'informations, contactez nous à l'adresse suivante : <a id="to"href="mailto:chocopap@example.com">chocopap@example.com</a><br/> </p>
<br/><br/><br/><br/>
<GoogleMap />
</address>

</>
);
}
