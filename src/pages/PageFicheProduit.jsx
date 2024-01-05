import React, { useState, useEffect, useContext } from "react";
import "../styles/ficheproduit.css";
import PanierContext from "../store/panier-context";
import BasketItem from "../components/BasketItem"

export default function PageFicheProduit() {
const [chocolats, setChocolats] = useState([]);
const [cart, setCart] = useState({});
const [selectedCategories, setSelectedCategories] = useState([]);
const { addItemToCart } = useContext(PanierContext);
const handleReset = () => {
setCart({}); // Réinitialise le panier à un objet vide
setSelectedCategories([]); // Réinitialise les catégories sélectionnées à un tableau vide
addItemToCart([]);
};
const handleOpenCart = () => {
// Logique pour ouvrir le panier
};


const images = {
image1: require('../images/produit1.jpg').default,
image2: require('../images/produit2.jpg').default,
image3: require('../images/produit3.jpg').default,
image4: require('../images/produit4.jpg').default,
image5: require('../images/produit5.jpg').default,
image6: require('../images/produit6.jpg').default,
image7: require('../images/produit7.jpg').default,
image8: require('../images/produit8.jpg').default,
image9: require('../images/produit9.jpg').default,
image10: require('../images/produit10.jpg').default,

// ... ajoutez d'autres images ici
};
useEffect(() => {
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    setChocolats(data.chocolats);
  });
}, []);
// Ajout des éléments panier 

const handleAddToCart = (chocolatId) => {
setCart((prevCart) => ({
  ...prevCart,
  [chocolatId]: (prevCart[chocolatId] || 0) + 1,
}));
};
// Retrait des éléments panier 

const handleRemoveFromCart = (chocolatId) => {
if (cart[chocolatId] > 1) {
setCart((prevCart) => ({
  ...prevCart,
  [chocolatId]: prevCart[chocolatId] - 1,
}));
} else {
const newCart = { ...cart };
delete newCart[chocolatId];
setCart(newCart);
}
};

// fonction qui semble changer l'état de selection d'une catégorie . si elle est slectionnée , elle est déslectionnées et si elle est déselectionnée , elle est selectionnée.
// si une autre catégorie est sélectionnée et que "tous les produits" est sélectionnée, "tous les produits" est déselectionnée
const handleCategoryChange = (category) => {
let updatedCategories;
if (category === "Tous les produits") {
updatedCategories = selectedCategories.includes(category)
  ? []
  : ["Tous les produits"];
} else {
updatedCategories = [...selectedCategories];
const index = updatedCategories.indexOf(category);
if (index === -1) {
  updatedCategories.push(category);
} else {
  updatedCategories.splice(index, 1);
}
const tousLesProduitsIndex =
  updatedCategories.indexOf("Tous les produits");
if (tousLesProduitsIndex !== -1) {
  updatedCategories.splice(tousLesProduitsIndex, 1);
}
}
setSelectedCategories(updatedCategories);
console.log(updatedCategories);
};

const filteredChocolats = chocolats.filter((chocolat) => {
const isTousLesProduitsSelected = selectedCategories.includes("Tous les produits");
const isCategoryMatch = 
isTousLesProduitsSelected ||
selectedCategories.length === 0 ||
selectedCategories.some((category) => chocolat.category.includes(category));

return isCategoryMatch;
});

return (
<>


<h1 className="titleficheproduit">LES PRODUITS</h1>
  

<div className="containerficheproduct">

{filteredChocolats.map((chocolat) => (
<div className="containerParentficheproduct" key={chocolat.id}>
{/* ... (le contenu de chaque chocolat ici) ... */}

<img id="imgficheproduct"src={require(`../images/${chocolat.image}`)}alt={chocolat.id + " image"}/>

<div id="BoxChildrenContentProduct">
<h2>{chocolat.title}</h2>
</div>
<p>prix : {chocolat.price} €</p>
<p>Description du produit :<br /> {chocolat.description}</p> 
{/* ... (boutons et autres éléments ici) ... */}
<div>


<span className="buttaddproduct" onClick={() => addItemToCart(chocolat.id)}>
      Ajouter au panier ({cart[chocolat.id] || 0})
<span className="buttaddproduct" onClick={() => handleAddToCart(chocolat.id)}>
+1
</span>
</span>
<p id="ingred">Ingrédients :<br /> {chocolat.ingredients}</p>

</div>
</div>
))}
</div>
</>
)};