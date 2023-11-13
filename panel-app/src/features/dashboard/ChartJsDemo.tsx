import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { LineChartData } from "./Dashboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartJsDemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

const ChartJsDemo: FC<ChartJsDemoProps> = (props: ChartJsDemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  const chartData: ChartData<"line", number[], number> = {
    labels: data.map((val) => val.i),
    datasets: [
      {
        label: "Dataset 1",
        data: data.map((val) => val.y),
        borderColor: theme.palette.action.focus,
        backgroundColor: theme.palette.action.focus,
        spanGaps: true, // +1 performance
        showLine: false, // +1 performance
      },
    ],
  };

  const dataMin = chartData?.labels?.[0] ?? 0;
  const dataMax = chartData?.labels?.[chartData?.labels?.length - 1] ?? 0;

  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: false, // +1 performance
    spanGaps: true, // +1 performance
    showLine: false, // +1 performance

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: dataMin + (dataMax - initialDataLength),
        max: dataMax,
        ticks: {
          callback: (val) => (+val % 1000 === 0 ? val : null),
        },
        grid: {
          color: "#FFFFFF",
        },
      },
      y: {
        grid: { color: "#FFFFFF" },
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">Chart.js [react-chart-2] (Canvas)</Typography>
      <Box>
        <Line
          options={options}
          data={chartData}
          width={1200}
          height={300}
          updateMode="none"
          //"resize" [x] | "default" [x] | "none" [?] | "reset" [x] | "hide" [x] | "show" [x] | "active" [?] | undefined
        />
      </Box>
    </AppCard>
  );
};

export default ChartJsDemo;
