/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import DetailAnnonce from './DetailAnnonce';


const AllAnnonce = ({setOtherId,setCurrentComponent}) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://voitureoccasion-production-d019.up.railway.app/Voitureutilisateur_view`);

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Mettez à jour l'état avec les données récupérées
        } else {
          console.error('Erreur lors de la requête HTTP:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="favourite-place place-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>ANNONCE</span>
                            <h2>Listes des annonces</h2>
                        </div>
                    </div>
                </div>
                {loading===false && <div className="row">
                    {userData.map((user) => (
                        <DetailAnnonce user={user} setOtherId={setOtherId} setCurrentComponent={setCurrentComponent}/>
                    ))}
                </div>}
                {loading === true && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src="Loading_2.gif" alt="Loading..." />
                  </div>
                )}

            </div>
    </div>
)};

export default AllAnnonce;
