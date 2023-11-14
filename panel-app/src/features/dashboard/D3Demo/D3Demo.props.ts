import { LineChartData } from "../Dashboard";

export type D3DemoProps = {
  data: LineChartData[];
  initialDataLength: number;
  doubleBuffering?: boolean;
};

export type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
