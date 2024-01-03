import React from "react";
import "../styles/Boutique.css";
import "../styles/chocolat.css";
import  Chocolat from "../pages/pageficheproduitjson";
import  MobileDropdown  from "../components/Dropdown";

// import { Panier } from "../components/Button";

export default function BoutiqueSection() {
    return (
     <>
          <h1 className="titleBoutiquesection">BOUTIQUE</h1>
          <MobileDropdown />
          <article />
           <Chocolat />
      

        
      </>
    );
  }
  