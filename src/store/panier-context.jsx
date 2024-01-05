import { createContext, useReducer, useEffect, useState } from "react";
import chocolats from "../store/data.json";


// contient des valeurs par défaut pour les éléments du panier et des fonctions pour ajouter, retirer et réinitialiser le panier.
export const PanierContext = createContext({
items: [],
addItemToCart: () => {},
updateItemsquantity : ()=>{},
resetItems :()=>{},
removeItemFromCart:()=>{},
});


// - `cartReducer` définit la logique de modification de l'état du panier en fonction des actions envoyées. 
const cartReducer = (state, action) => {
switch (action.type) {
case "AJOUTER_DANS_PANIER":
const existingItem = state.items.find(item => item.id === action.payload.productId);
const updatedItems = [...state.items];

if (existingItem) {
const index = updatedItems.findIndex(item => item.id === action.payload.productId);
updatedItems[index].quantity += 1;
} else {
const product = chocolats.chocolats.find(p => p.id === action.payload.productId);
if (product) {
updatedItems.push({
id: product.id,
title: product.title,
price: product.price,
quantity: 1,
});
}
}
return { ...state, items: updatedItems };

case "RETIRER_DU_PANIER":
const filteredItems = state.items.filter(item => item.id !== action.payload.productId);
return { ...state, items: filteredItems };

case "ACTUALISER_QUANTITE_PRODUIT":
const { productId, quantity } = action.payload;
const itemToUpdate = state.items.find(item => item.id === productId);

if (itemToUpdate) {
const index = state.items.findIndex(item => item.id === productId);
const updatedQuantity = itemToUpdate.quantity + quantity;

const newItems = [...state.items];
if (updatedQuantity <= 0) {
newItems.splice(index, 1);
} else {
newItems[index].quantity = updatedQuantity;
}
return { ...state, items: newItems };
}
return state;

case 'RESET_ITEMS':
// logique pour réinitialiser le panier
return { ...state, items: [] };
default:
return state;
}
};

//gérer l'état du panier à l'aide du `cartReducer`.
// manipulation du panier (`handleProductToCart`, `handleRemoveFromCart`, `handleUpdateProductQuantity`) qui utilisent le `cartDispatch` pour envoyer des actions au `cartReducer`.
export const PanierContextProvider = ({ children }) => {
const [cartState, cartDispatch] = useReducer(cartReducer, {
items: [],
});

const resetItems = () => {
cartDispatch({ 

type: "RESET_ITEMS",

});
};

// fonction d'ajouter dans le panier 

const handleProductToCart = (productId) => {
cartDispatch({
type: "AJOUTER_DANS_PANIER",
payload: { productId },
});
};

// fonction de retrait dans le panier 


const handleRemoveFromCart = (productId) => {
cartDispatch({
type: "RETIRER_DU_PANIER",
payload: { productId },
});
};

// fonction d'actualisation de la quantité 

const handleUpdateProductQuantity =(productId, quantity)=>{

cartDispatch({

type:"ACTUALISER_QUANTITE_PRODUIT",
payload : {

productId,
quantity,
},
});
}

// contient les éléments du panier actuels et les fonctions pour les manipuler.
const initialValue = {
items: cartState.items,
addItemToCart: handleProductToCart,
removeItemFromCart : handleRemoveFromCart,
updateItemsquantity : handleUpdateProductQuantity,
resetItems: resetItems,
};

return (
<PanierContext.Provider value={initialValue}>
{children}
</PanierContext.Provider>
);
};

export default PanierContext;