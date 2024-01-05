import React from "react";
import "../styles/Boutique.css";
import "../styles/chocolat.css";
import  Showproducts from "../components/Products";
import  Filtermobile  from "../components/filtermobile";


// DEUXIEME PAGE PRODUITS

// import { Panier } from "../components/Button";

export default function BoutiqueSection() {
return (
<>
<h1 className="titleBoutiquesection">BOUTIQUE</h1>
<Filtermobile />
<Showproducts />
</>
    

);
}
