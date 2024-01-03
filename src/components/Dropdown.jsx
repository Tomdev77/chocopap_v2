import React, { useState, useEffect, useContext } from "react";
import "../styles/chocolat.css";
import "../styles/dropdown.css";

export default function MobileDropdown() {

  
  const [chocolats, setChocolats] = useState([]);
  const [selectedCategories, setSelectedCategories, setSelectedCategory] = useState([]);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [setCategories] = useState([]);
  const [noteMin, setNoteMin] = useState("");
  const [noteMax, setNoteMax] = useState("");
  const filteredChocolats = chocolats.filter((chocolat) => {
  // ...
});
const categories = ['Tous les produits', 'blanc', 'lait', 'noir', 'caramel', 'noix', 'fruit', 'liqueur'];
const handleClick = (category) => {
  setSelectedCategory(category);
};
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

  const handleCategoryChange = (category) => {
    let updatedCategories;
    
    if (category === "Tous les produits") {
      updatedCategories = selectedCategories.includes(category) ? [] : ["Tous les produits"];
    } else {
      updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories, category];
      
      const tousLesProduitsIndex = updatedCategories.indexOf("Tous les produits");
      if (tousLesProduitsIndex !== -1) {
        updatedCategories.splice(tousLesProduitsIndex, 1);
      }
    }
    
    setSelectedCategories(updatedCategories);
    console.log(updatedCategories);
  };


      // bouton de reinitialisation à 0 , filtrage prix + filtrage note

      const handleReset = () => {

      
        setPrixMin("");
        setPrixMax("");
        setNoteMin("");
        setNoteMax("");
        
      setSelectedCategories([]);


      };
        return (
          <><div className="mobileDropdownContainer">
            <h4>Catégorie</h4>
            <div className="mobileDropdownContent">
              <h4>Filtre</h4>
              <select value={selectedCategories} onChange={handleCategoryChange}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category, index) => (
                  <option key={index} onClick={() => handleClick(category)} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
            
            <div className='fetchdatamobile'>
              {filteredChocolats.map((chocolat) => (
                <section key={chocolat.id}>
                  <img src={require(`../images/${chocolat.image}`)} alt="imgjson" />
                  <h2>{chocolat.title}</h2>
                  <p>prix : {chocolat.price} €</p>
                  <p>Note clients : {chocolat.note}</p>

                </section>
              ))}
            </div>
       
            
            </>
        );
      };
      
