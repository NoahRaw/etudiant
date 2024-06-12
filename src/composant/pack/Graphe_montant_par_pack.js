import React, { useState, useEffect } from 'react';
import BarChart from "../chart/BarChart";

const StatistiqueRevenue = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://etudiant-backend.vercel.app/pack/graphe_montant_par_pack`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setChartData({
            labels: data.nom.map((nom) => nom),
            datas: data.montant_par_pack.map((montant_par_pack) => montant_par_pack),
        })
        } else {
          console.error('Erreur lors de la requête HTTP:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    };

    fetchData();
  }, []); // Le tableau vide en tant que dépendance signifie que cette requête sera effectuée une seule fois lors du montage du composant.

  return (
    <div>

<div id="right-panel" className="right-panel">
                    <div className="content">
                            <div className="animated fadeIn">
                                  <div className="col-lg-8">
                                        <div className="card">
                                            <div className="card-body">
                                                    <div className="card-title">
                                                              <h3 className="text-center">Statistique montant par pack</h3>
                                                    </div>
                                                    <hr></hr>
      <div style={{ width: 700 }}>
      {
        chartData!=null &&
        <BarChart labels={chartData.labels} datas={chartData.datas}/>
      }
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
