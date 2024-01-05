
import React from 'react';
import Badge from 'react-bootstrap/Badge';

// Composant BasketItem enfant de Navbar => PREMIERE PAGE PRESENTATION HP, DEUXIEME PAGE PRODUITS,TROISIEME PAGE => fiche produits


function BasketItem({ chocolat, cart, handlOpenCart, addItemToCart }) {
const itemCount = cart[chocolat.id] || 0;


return (
<div className="basket"bg={itemCount > 0 ? "success" : ""}>{itemCount}
<span 
onClick={() => {
handlOpenCart(); // Make sure this function is implemented in the parent component
addItemToCart(chocolat.id); // Ensure this function updates the cart state
}} 
>
{itemCount}
</span>
<img id="panier" src={require("../images/panier.png")} alt="panier" />
</div>
);
}
export default BasketItem;