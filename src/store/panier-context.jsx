import { createContext, useReducer } from "react";
import chocolats from "../store/data.json";

export const PanierContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemsquantity : ()=>{},
    resetItems :()=>{},
});


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

export const PanierContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, {
        items: [],
    });

    const resetItems = () => {
        cartDispatch({ 
            
            type: "RESET_ITEMS",

        });
      };

    const handleProductToCart = (productId) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: { productId, },
        });
    };

    const handleRemoveFromCart = (productId) => {
        cartDispatch({
            type: "RETIRER_DU_PANIER",
            payload: { productId },
        });
    };

    const handleUpdateProductQuantity =(productId, quantity)=>{

        cartDispatch({

            type:"ACTUALISER_QUANTITE_PRODUIT",
            payload : {

                productId,
                quantity,
            },
        });
    }

    const initialValue = {
        items: cartState.items,
        addItemToCart: handleProductToCart,
        removeFromCart : handleRemoveFromCart,
        updateItemsquantity : handleUpdateProductQuantity,
        resetItems: resetItems
    };

    return (
        <PanierContext.Provider value={initialValue}>
            {children}
        </PanierContext.Provider>
    );
};

export default PanierContext;