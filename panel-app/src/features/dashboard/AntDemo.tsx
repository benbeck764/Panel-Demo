/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { LineChartData } from "./Dashboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Line } from "@ant-design/plots";

type AntDemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

// Is there a way to console.log() the time it takes for <Line> to fully render/paint?
const AntDemo: FC<AntDemoProps> = (props: AntDemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  const dataMin = data?.[0]?.i ?? 0;
  const dataMax = data?.[data?.length - 1]?.i ?? 0;

  const min = dataMin + (dataMax - initialDataLength);
  const max = dataMax;

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">Ant Design (Canvas)</Typography>
      <Box sx={{ my: 2 }}>
        <Line
          data={data}
          width={1880}
          height={400}
          animation={false} // +1 Performance
          tooltip={false} // +1 Performance
          xField="i"
          yField="y"
          xAxis={{
            tickInterval: 1000,
            min: min,
            minLimit: min,
            max: max,
            maxLimit: max,
            position: "bottom",
            animate: false,
          }}
          yAxis={{
            tickInterval: 0.5,
            min: -1,
            max: 1,
            position: "left",
            animate: false,
          }}
          color={theme.palette.action.focus}
        />
      </Box>
    </AppCard>
  );
};

export default AntDemo;
