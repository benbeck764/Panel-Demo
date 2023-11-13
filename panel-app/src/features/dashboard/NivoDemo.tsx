import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { ResponsiveLineCanvas, Serie } from "@nivo/line";
import { LineChartData } from "./Dashboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type NivoDemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

const NivoDemo: FC<NivoDemoProps> = (props: NivoDemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  const chartData: Serie[] = [
    {
      id: "Series",
      data: data.map((val) => {
        return { x: val.i, y: val.y };
      }),
    },
  ];

  const dataMin = chartData?.[0]?.data?.[0]?.x ?? 0;
  const dataMax =
    chartData?.[0].data?.[chartData?.[0]?.data?.length - 1]?.x ?? 0;

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">Nivo (Canvas)</Typography>
      <Box width="100%" height={400}>
        <ResponsiveLineCanvas
          data={chartData}
          isInteractive={false} // +1 Performance
          theme={{
            axis: {
              legend: {
                text: {
                  fill: "#FFFFFF",
                },
              },
              ticks: {
                text: {
                  fill: "#FFFFFF",
                },
              },
            },
            tooltip: {
              container: {
                color: "#000000",
              },
            },
          }}
          margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
          xScale={{
            type: "linear",
            min: +dataMin.valueOf() + (+dataMax.valueOf() - initialDataLength),
            max: +dataMax.valueOf(),
          }}
          yScale={{ type: "linear", stacked: true, min: -1, max: 1 }}
          curve="monotoneX"
          axisLeft={{
            legend: "Amplitude",
            tickValues: [-1, -0.5, 0, 0.5, 1],

            tickRotation: 0,
            legendOffset: -35,
            legendPosition: "middle",
          }}
          enableGridX={true}
          colors={theme.palette.action.focus}
          lineWidth={1}
          pointSize={4}
          pointColor={{ theme: "background" }}
          pointBorderWidth={1}
          pointBorderColor={{ from: "serieColor" }}
          gridYValues={[-1, -0.5, 0, 0.5, 1]}
        />
      </Box>
    </AppCard>
  );
};

export default NivoDemo;
