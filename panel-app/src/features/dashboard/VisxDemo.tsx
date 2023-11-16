import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { LineChartData } from "./Dashboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { scaleLinear } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import { LinePath } from "@visx/shape";

type VisxDemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

const VisxDemo: FC<VisxDemoProps> = (props: VisxDemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  const xExtent = extent<number>(data.map((d) => d.i)) as [number, number];
  const xScale = scaleLinear<number>({
    domain: [xExtent[0] + (xExtent[1] - initialDataLength), xExtent[1]],
  });
  const yScale = scaleLinear<number>({
    domain: [-1, 1],
  });

  const width = 1850;
  const height = 400;
  // update scale output ranges
  xScale.range([0, width]);
  yScale.range([height - 2, 0]);

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">Visx (SVG)</Typography>
      <Box width={width} height={height}>
        <svg width={width} height={height}>
          <LinePath<LineChartData>
            data={data}
            x={(d) => xScale(d.i) ?? 0}
            y={(d) => yScale(d.y) ?? 0}
            stroke={theme.palette.action.focus}
            strokeWidth={3}
            strokeOpacity={1}
            shapeRendering="geometricPrecision"
          />
        </svg>
      </Box>
    </AppCard>
  );
};

export default VisxDemo;
