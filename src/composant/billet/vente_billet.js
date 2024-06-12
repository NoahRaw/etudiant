/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from 'react';
import '../../css/Login.css';

const Login = ({setIsConnected,setCurrentComponent}) => {
  const [date_vente, set_date_vente] = useState('');
  const [nom_client, setnom_client] = useState('');
  const [contact, set_contact] = useState('');
  const [id_localisation, set_id_localisation] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [localisations, setLocalisations] = useState([]);
  const [packs, setPacks] = useState([]);
  const [id_pack, set_id_pack] = useState('');
  const [nbr_billet, set_nbr_billet] = useState(1);

    useEffect(() => {
        // Appel API pour récupérer les localisations
        fetch('https://etudiant-backend-csyozwddq-noahs-projects-49759aad.vercel.app/utilisateurs/localisations')
            .then(response => response.json())
            .then(data => setLocalisations(data))
            .catch(error => console.error('Error fetching localisations:', error));
    }, []); // Tableau de dépendances vide pour n'exécuter qu'une seule fois

    useEffect(() => {
        // Appel API pour récupérer les localisations
        fetch('https://etudiant-backend-csyozwddq-noahs-projects-49759aad.vercel.app/billet/get_all_packs')
            .then(response => response.json())
            .then(data => setPacks(data))
            .catch(error => console.error('Error fetching packs:', error));
    }, []); // Tableau de dépendances vide pour n'exécuter qu'une seule fois

//   const voir = () => 
//   {
// 	setCurrentComponent('AllAnnonceRetour')
//   }

  const handleChange = (event) => {
    set_id_localisation(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const id_utilisateur =localStorage.getItem('id_utilisateur');
    console.log(`id_pack:${id_pack},quantite:${nbr_billet}`);

    try {
		const response = await fetch('https://etudiant-backend-csyozwddq-noahs-projects-49759aad.vercel.app/billet/vente', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
                {datevente : date_vente , 
                    nomclient : nom_client , 
                    contact : contact , 
                    idutilisateur : id_utilisateur , 
                    idlocalisation : id_localisation,
                    idpack : id_pack,
                    quantite : nbr_billet,
                }
            ),
      	});

      if (response.ok) {
        alert('vente de billet insere')
      } else {
        console.error('Probleme serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
    finally
    {
        setLoading(false);
		setFormSubmitted(false)
    }
  };

return (
    <div>
            <div id="right-panel" className="right-panel">
                    <div className="content">
                            <div className="animated fadeIn">
                                  <div className="col-lg-8">
                                        <div className="card">
                                            <div className="card-body">
                                                    <div className="card-title">
                                                              <h3 className="text-center">Insertion de vente de billet</h3>
                                                    </div>
                                                    <hr></hr>
                <form onSubmit={handleSubmit} className="validate-form">
                    <div className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            type="date"
                            value={date_vente}
                            onChange={(e) => set_date_vente(e.target.value)}
                            placeholder="Date de vente"
                            required
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            type="text"
                            value={nom_client}
                            onChange={(e) => setnom_client(e.target.value)}
                            placeholder="Nom du client"
                            required
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            type="text"
                            value={contact}
                            onChange={(e) => set_contact(e.target.value)}
                            placeholder="Contact"
                            required
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                            <select
                                className="input100"
                                value={id_localisation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez la localisation</option>
                                {localisations.map((localisation) => (
                                    <option key={localisation.id} value={localisation.idlocalisation}>
                                        {localisation.designation}
                                    </option>
                                ))}
                            </select>
                            <span className="focus-input100"></span>
                        </div>
                    
                        <div className="wrap-input100 validate-input">
                            <select
                                className="input100"
                                value={id_pack}
                                onChange={(event)=>{set_id_pack(event.target.value);}}
                                required
                            >
                                <option value="">Sélectionnez le pack</option>
                                {packs.map((pack) => (
                                    <option key={pack.id} value={pack.idpack}>
                                        {pack.nom}
                                    </option>
                                ))}
                            </select>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            type="text"
                            value={nbr_billet}
                            onChange={(e) => set_nbr_billet(e.target.value)}
                            placeholder="nombre de billets"
                            required
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" type="submit">
                            Submit
                        </button>
                    </div>

                    {formSubmitted && loading === true && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src="Loading_2.gif" alt="Loading..." />
                        </div>
                    )}

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            
                        </span>
                    </div>

                    
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
);
};

export default Login;
