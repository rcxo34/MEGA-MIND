import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ data, options }) => {
  

  return (
    <div>
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default DoughnutChart;
