import {forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from "react-dom";
import "../styles/CartModal.css";
import Cart from "../components/cart";

// Composant CartModal => affichage de la pop up Cart modal =>  DEUXIEME PAGE PRODUITS,TROISIEME PAGE => fiche produits


const CartModal = forwardRef(function Modal({}, ref) {

const dialog=useRef();

useImperativeHandle(ref,()=>{
return{

open:()=>{

dialog.current.showModal();
}
};
});

const handleClose = () => {
dialog.current.close();
};
return createPortal(

<dialog id="modal" ref={dialog}>

<h2 id="paniercart">Panier</h2>
<Cart />
<form method="dialog" >
<button className="buttclosemodal" onClick={handleClose}><img id ="shop" src={require(`../images/croix.png`)} width="50"alt="imgjson" /></button>
</form>

</dialog>, document.getElementById('modal-root')

)

});

export default CartModal;


