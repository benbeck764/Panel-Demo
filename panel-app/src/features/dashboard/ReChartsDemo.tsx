import AppCard from "@benbeck764/react-components/Card";
import { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { LineChartData } from "./Dashboard";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type ReChartsDemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

// https://github.com/recharts/recharts/issues/300
const ReChartsDemo: FC<ReChartsDemoProps> = (props: ReChartsDemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">Recharts (SVG)</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="y"
            stroke={theme.palette.action.focus}
            strokeWidth={3}
            animateNewValues={false} // +1 Performance
            isAnimationActive={false} // +1 Performance
          />
          <CartesianGrid
            stroke="#ccc"
            verticalValues={data
              .filter((v) => v.i % 1000 === 0)
              .map((v) => v.i)}
          />
          <XAxis
            dataKey="i"
            domain={([dataMin, dataMax]: [number, number]) => {
              return [dataMin + (dataMax - initialDataLength), dataMax];
            }}
            type="number"
          />
          <YAxis
            type="number"
            domain={[-1, 1]}
            label={{
              value: `Amplitude`,
              style: { textAnchor: "middle", fill: "#FFFFFF" },
              angle: -90,
              position: "left",
              offset: -10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AppCard>
  );
};

export default ReChartsDemo;
