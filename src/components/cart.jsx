import { useContext } from "react";
import PanierContext from "../store/panier-context";
import "../styles/CartModal.css";


// Composant Cart => affichage  du contenu à l'intérieur de la pop up Cart modal =>  DEUXIEME PAGE PRODUITS,TROISIEME PAGE => fiche produits


const Cart = ()=>{


const {items, updateItemsquantity, resetItems}= useContext(PanierContext) // dans le composant Cart superposé sur le cartmodal,=> incrémenter + 1 et réduire - 1 les éléments présents dans le modal avec les sélections - et + 
const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0); // => calculer le total des éléments dans le modal, une fois affiché 
const resetCart = () => {
// Utilisez la fonction resetItems de votre contexte pour réinitialiser le panier
resetItems();
};

return (

<div id="cart">

{items.length === 0 && (
<p id="wordingempty">Votre Panier est vide.</p>
)}

{items.length > 0 && (
<ul className="cart-items">
{items.map((product) => (
<li key={product.id} className="flex">
<div className="flex flex-col">
<img className="image" require={product.image}/><br/>
<span className="title">{product.title}</span><br />
<span className="price">{product.price} Euros</span>
</div>

<div className="cart-box-actions flex">
<span className="redvalue" onClick={() => updateItemsquantity(product.id, -1)}> - </span>
<span className="price-quantity">{product.quantity}</span>
<span className="addvalue" onClick={() => updateItemsquantity(product.id, +1)}> + </span>
</div>
</li>
))}

</ul>
)}

{items.length > 0 && (
<div id="cart-total">
<p id="amounttext">
Montant total : {""}
<strong>{totalAmount.toFixed(2)} Euro{totalAmount > 1 ? "s" : ""}</strong>
</p>
</div>
)}

{/* Bouton de réinitialisation => renitialise les éléments produits du cart  */}
{items.length > 0 && (
<div id="cart-reset"> 
<button id="resetbuttcart"onClick={resetCart} style={{ marginTop: '20px' }}>
Réinitialiser le Panier
</button>
</div>
)}


{/* Bouton de validation, non cliquable */}
{items.length > 0 && (
<div id="cart-reset"> 
<button id="validatebuttcart" style={{ marginTop: '20px' }}>
Valider le Panier
</button>
</div>
)}


</div>


);
};

export default Cart;