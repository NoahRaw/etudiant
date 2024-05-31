/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState,useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function DetailAnnonce({user,setOtherId,setCurrentComponent}) {
  const [estVisible, setEstVisible] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const [favorisAdded, setFavorisAdded] = useState(false);

  const handleClick = () => {
    setEstVisible(!estVisible);
  };

  const contacter = () => {
    const json={
        name : user.nomutilisateur,
        userId : user.idutilisateur,
        active : false,
        isOnline :  false,
        image : user.image,
    };
    setOtherId(json)
    setCurrentComponent('chatBody')
  }

  const addToFavorites = async () => {
    try {
      const response = await fetch('https://voitureoccasion-production-d019.up.railway.app/Favoris', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idvoitureutilisateur: user.idvoitureutilisateur, // ID de l'annonce à ajouter aux favoris
        }),
      });

      if (response.ok) {
        // Ajouté aux favoris avec succès
        setFavorisAdded(true);
      } else {
        // Gérer les erreurs de requête
        console.error('Erreur lors de la demande:', response.statusText);
        alert('une erreur s`est produite lors de l`insertion dans favoris ou vous n`etes pas connecte!');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
  };

  const [voiturePhoto, setVoiturePhoto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://voitureoccasion-production-d019.up.railway.app/photoVoitureUtilisateurs/getPhotoVoitureUtilisateur/${user.idvoitureutilisateur}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setVoiturePhoto(data); // Mettez à jour l'état avec les données récupérées
        } else {
          console.error('Erreur lors de la requête HTTP:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    };

    fetchData();
  }, [user.idvoitureutilisateur]);


  return (
    <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="single-place mb-30">
            <div className="place-img">
            {voiturePhoto.map((photo) => (
                    <img src={`${photo.nomPhoto}`}  alt="Description de l'image" ></img>
            ))}
            </div>
            <div className="place-cap">
                <div className="place-cap-top">
                    <span><i className="fas fa-user"></i><span>{user.nomutilisateur}</span> </span>
                  
                    <h3><a href="#">{user.nomtypedevehicule} {user.nommodele}</a></h3>
                    <p className="dolor">{user.prix} Ar <span> / {user.kilometrage} km</span></p>
                </div>
                <div className="place-cap-bottom">
                    <ul>
                        <li><i className="fas fa-calendar-alt"></i>{user.dateventedebut}</li>
                        <li><i className="fas fa-car"></i>{user.matricule}</li>
                    </ul>
                </div>
                {estVisible && 
                    <div className="place-cap-top">
                        <p className="dolor">Carburant : <span> {user.nomcarburant}</span></p>
                        <p className="dolor">Puissance en chevaux : <span> {user.kw} kw / {user.cv} cv</span></p>
                        <p className="dolor">Puissance : <span> {user.puissance}</span></p>
                        <p className="dolor">Marque : <span> {user.nommarque}</span></p>
                        <p className="dolor">Type de boite de vitesse : <span> {user.nomboitedevitesse}</span></p>
                        <p className="dolor">Nombre de porte : <span> {user.nbrporte}</span></p>
                    </div>
                }
                <div class="button-group-area mt-40">
                    <button onClick={handleClick} class="genric-btn success circle">Detail</button>
                    <button onClick={contacter} class="genric-btn danger circle" style={{marginLeft : 55}}>Contacter</button>
                    {/* <button onClick={addToFavorites} className="genric-btn primary circle" style={{ marginLeft: 55 }}>Ajouter aux favoris</button> */}
                </div>
                <div class="button-group-area mt-40">
                  {!favorisAdded ? (
                    <button onClick={addToFavorites} className="genric-btn primary circle" style={{ marginLeft: 55 }}>
                      <FaHeart /> Ajouter aux favoris
                    </button>
                  ) : (
                    <button className="genric-btn primary circle" style={{ marginLeft: 55 }} disabled>
                      <FaHeart style={{ color: 'red' }} /> Ajouté aux favoris
                    </button>
                  )}
                </div>
            </div>

        </div>
    </div>
  );
}
