import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { PiechartData } from "../types";

function Piechart({ piechartData }: { piechartData: PiechartData[] }) {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Categories",
    },
    series: [
      {
        name: "Count",
        data: piechartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default Piechart;
