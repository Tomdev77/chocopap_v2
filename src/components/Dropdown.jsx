import React, { useState, useEffect,useContext } from "react";
import "../styles/dropdown.css";
import PanierContext from "../store/panier-context";

const Dropdown = () => {
  const [chocolats, setChocolats] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [categories, setCategories] = useState([]);
  const [noteMin, setNoteMin] = useState("");
  const [noteMax, setNoteMax] = useState("");
  const [cart, setCart] = useState({});
  const{addItemToCart}=useContext(PanierContext);



 
  // récolte des données du fichier json et interprétation de ce des données en affichage 
  // calcul les catégories uniques à partir des données récupéres 

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        setChocolats(data.chocolats);
        const uniqueCategories = Object.keys(
          data.chocolats.reduce((acc, chocolat) => {
            return { ...acc, ...chocolat.category };
          }, {})
        );


// ajout nouvelle category à la liste des categories uniques

        const newCategory = "Tous les produits";
        const updatedUniqueCategories = [newCategory, ...uniqueCategories];
        setCategories(updatedUniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  //  mise en place filtre prix min et prix max

  console.log(categories);
  const handlePrixMinChange = (e) => {
    setPrixMin(e.target.value);
  };
  const handlePrixMaxChange = (e) => {
    setPrixMax(e.target.value);
  };


  //  mise en place filtre Note min et Note max

  console.log(categories);
  const handleNoteMinChange = (e) => {
    setNoteMin(e.target.value);
  };
  const handleNoteMaxChange = (e) => {
    setNoteMax(e.target.value);
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


// selection du tableau chocolats, la condition vérifie si selected categories inclut tous les produits . une cotégorie est sélectionnée ou toutes les catégorie.

const filteredChocolats = chocolats.filter((chocolat) => {
  const isTousLesProduitsSelected =
    selectedCategories.includes("Tous les produits");
  const isCategoryMatch =
    isTousLesProduitsSelected ||
    selectedCategories.length === 0 ||
    selectedCategories.some((category) => chocolat.category[category]);

        // filtrage catégorie produit et fourchette de prix => si chocolat remplit les deux condtions alors il sera affiché dans le tableau


        const isPriceInRange =
        (prixMin === "" || chocolat.price >= parseFloat(prixMin)) &&
        (prixMax === "" || chocolat.price <= parseFloat(prixMax));


  
        // filtrage catégorie produit et fourchette de notes => si chocolat remplit les deux condtions alors il sera affiché dans le tableau


        const isNoteInRange =
        (noteMin === "" || chocolat.note >= parseFloat(noteMin)) &&
        (noteMax === "" || chocolat.note <= parseFloat(noteMax));

        return isCategoryMatch && isPriceInRange && isNoteInRange;});


        // bouton de reinitialisation à 0 , filtrage prix + filtrage note

        const handleReset = () => {
          setCart({}); // Réinitialise le panier à un objet vide
          setSelectedCategories([]); // Réinitialise les catégories sélectionnées à un tableau vide
          setPrixMin(""); // Réinitialise à 0 ou à une valeur par défaut si nécessaire
          setPrixMax(""); // Réinitialise à 0 ou à une valeur par défaut si nécessaire
          setNoteMin(""); // Réinitialise à 0 ou à une valeur par défaut si nécessaire
          setNoteMax(""); // Réinitialise à 0 ou à une valeur par défaut si nécessaire
        };
      

        const handleAddToCart = (chocolatId) => {
          setCart((prevCart) => ({
            ...prevCart,
            [chocolatId]: (prevCart[chocolatId] || 0) + 1,
          }));
        };


        
      // Style pour l'affichage de l'image

  return (
    <>
  <div className="mobileDropdownContainer">
  <h4>Catégorie : cliquez ici</h4>
  <div className="mobileDropdownContent">
    <h4 className="titlefilterDropdownContainer">Filtre</h4>
    <div className="category-checkboxes">

      {categories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            id={`Panel1form_${category}`}
            name={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={`Panel1form_${category}`}>{category}</label>
          <br />
        </div>
      ))}
      </div>
      </div>
    </div>
    <div className="filterContainer">
        <div className="filterByPriceAndNote">
          <input type="number" placeholder="Prix Min" value={prixMin} onChange={handlePrixMinChange} />
          <input type="number" placeholder="Prix Max" value={prixMax} onChange={handlePrixMaxChange} />
          <input type="number" placeholder="Note Min" value={noteMin} onChange={handleNoteMinChange} />
          <input type="number" placeholder="Note Max" value={noteMax} onChange={handleNoteMaxChange} />
        </div>
     
        <span className="resetbutt" onClick={handleReset}>Reinitialiser le filtre</span>
      </div>


<article className='fetchdatadesktop'>
        {filteredChocolats.map((chocolat) => (
          <section key={chocolat.id}>
            <img src={require(`../images/${chocolat.image}`)} alt="imgjson" />
            <h2>{chocolat.title}</h2>
            <p>prix : {chocolat.price} €</p>
            <p>Note clients : {chocolat.note}</p>

             {/* Compteur et bouton d'ajout au panier */}
             <div>
            </div>
            <div>
            <span className="buttaddproduct" onClick={() => addItemToCart(chocolat.id)}>
  Ajouter au panier ({cart[chocolat.id] || 0})
  <span className="buttaddproduct" onClick={() => handleAddToCart(chocolat.id)}>
    +1
  </span>
</span>

               <span className="buttinfos"><a href="/ficheproduit">En savoir plus</a></span>
               <span className="resetbutt" onClick={handleReset}>Renitialiser le panier({cart[chocolat.id] || 0})</span>

            </div>
          </section>
        ))}
      </article>

    

    </>
   );
  }


export default Dropdown;
