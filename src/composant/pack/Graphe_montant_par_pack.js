import React, { useState, useEffect } from 'react';
import BarChart from "../chart/BarChart";

const StatistiqueRevenue = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2000/pack/graphe_montant_par_pack`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setChartData({
            labels: data.nom.map((nom) => nom),
            datasets: [
            {
                label: "Statistique montant par pack",
                data: data.montant_par_pack.map((montant_par_pack) => montant_par_pack),
                backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
              ],
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
        <BarChart chartData={chartData} />
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
