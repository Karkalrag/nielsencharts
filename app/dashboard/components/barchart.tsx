import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Product } from "../types";

function Barchart({ products }: { products: Product[] }) {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in " + products[0].category,
    },
    xAxis: {
      categories: products.map((product) => product.title),
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Product",
        data: products.map((product) => product.price),
        dataLabels: {
          enabled: true,
          format: "{y}$", // Display the value on top of the column
          style: {
            textOutline: "none", // To remove text outline (if needed)
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default Barchart;
