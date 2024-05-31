import React, { useState, useEffect } from 'react';
import DetailHistoriqueAnnonce from './DetailHistoriqueAnnonce';

const HistoriqueAnnonce = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://voitureoccasion-production-d019.up.railway.app/Voitureutilisateur_view/getHistoriqueAnnonce`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    });

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
                setLoading(false)
            }
        };

        fetchData();
    }, [authToken]);


  return (
    <main>
        <div className="favourite-place place-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>ANNONCE</span>
                            <h2>Historique de vos annonces</h2>
                        </div>
                    </div>
                </div>
                {loading === true && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src="Loading_2.gif" alt="Loading..." />
                  </div>
                )}
                <div className="row">
                    {userData.map((user) => (
                        <DetailHistoriqueAnnonce
                        key={user.idvoitureutilisateur}
                        nomutilisateur={user.nomutilisateur}
                        idvoitureutilisateur={user.idvoitureutilisateur}
                        dateventedebut={user.dateventedebut}
                        matricule={user.matricule}
                        kilometrage={user.kilometrage}
                        prix={user.prix}
                        nommarque={user.nommarque}
                        nommodele={user.nommodele}
                        nomcarburant={user.nomcarburant}
                        kw={user.kw}
                        cv={user.cv}
                        nomboitedevitesse={user.nomboitedevitesse}
                        nomtypedevehicule={user.nomtypedevehicule}
                        nbrporte={user.nbrporte}
                        puissance={user.puissance}
                        setAnnonces={setUserData}
                        />
                    ))}
                </div>
            </div>
        </div>
    </main>
  );
};

export default HistoriqueAnnonce;
