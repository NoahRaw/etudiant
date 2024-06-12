import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({labels,datas}) => {
  console.log('datas');
  console.log(datas);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: datas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart Example',
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '50px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;