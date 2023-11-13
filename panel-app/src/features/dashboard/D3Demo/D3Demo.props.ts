import { LineChartData } from "../Dashboard";

export type D3DemoProps = {
  data: LineChartData[];
  initialDataLength: number;
};

export type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
