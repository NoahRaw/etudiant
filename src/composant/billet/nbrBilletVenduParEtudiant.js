import React, { useState, useEffect } from 'react';

const StatistiqueRevenue = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await fetch('http://localhost:2000/utilisateurs/stat_billet_etudiant');
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log(data.all_billet)
        } else {
          console.error('Erreur lors de la récupération des commissions:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des commissions:', error);
      }
    };

    fetchCommissions();
  }, []);

  return (
    <div>
      <div class="content"/>
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Nombre De Billet Vendu Par Etudiant</strong>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table" class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th>Etudiant</th>

                                    {data.all_user && data.all_billet.map((billet) => (  
                                    <th>
                                      {billet.prix}
                                    </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.all_user && data.all_billet && data.all_user.map((user) => (
                                    <tr>
                                      <td>
                                        {user['nom']}
                                      </td>
                                      {data.all_billet.map((billet) => (
                                        data.nbr_billet_etudiant[user['nom']] !== undefined &&
                                        <td>
                                          {data.nbr_billet_etudiant[user['nom']][billet['prix']]}
                                        </td>
                                        
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
    </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">Total prix matiere premiere</p>
                      <p className="fs-30 mb-2">{data.prix_total_matiere_premiere}</p>
                    </div>
                  </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default StatistiqueRevenue;
