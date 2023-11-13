/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { D3DemoProps, Margin } from "./D3Demo.props";
import * as d3 from "d3";
import { LineChartData } from "../Dashboard";

const D3Demo: FC<D3DemoProps> = (props: D3DemoProps) => {
  const { data, initialDataLength } = props;
  const theme = useTheme();

  const width = 1860;
  const height = 400;
  const margin: Margin = {
    top: 30,
    bottom: 0,
    left: 10,
    right: 10,
  };

  let canvas: d3.Selection<HTMLCanvasElement, unknown, HTMLElement, any>;
  let context: CanvasRenderingContext2D | null | undefined;

  let xAxisG: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  let xScale: d3.ScaleLinear<number, number>;
  let xAxis: d3.Axis<number>;
  let yAxisG: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  let yScale: d3.ScaleLinear<number, number>;
  let yAxis: d3.Axis<number>;

  useEffect(() => {
    d3.select("#svg").remove();
    d3.select("#canvas").remove();
    initializeChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.length) initializeChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // const reinitialize = (): void => {
  //   d3.select("#svg").remove();
  //   d3.select("#canvas").remove();
  //   initializeChart();
  //   initializeChartData();
  // };

  const initializeChart = (): void => {
    const viewDiv = d3.select("#chart-view-div");

    const svg = viewDiv
      .append("svg")
      .attr("id", "svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute");

    canvas = viewDiv
      .append("canvas")
      .attr("id", "canvas")
      .attr("width", width)
      .attr("height", height);

    context = canvas.node()?.getContext("2d");

    // Create the primary group
    const mainG = svg.append("g");
    //.attr("transform", `translate (${margin.left},${margin.top})`);

    // Add group for x-axis
    xAxisG = mainG
      .append("g")
      .attr("id", "xAxisG")
      .attr("class", "axis x")
      .attr("transform", `translate(0,${height})`);

    // Add group for y-axis
    yAxisG = mainG.append("g").attr("id", "yAxisG").attr("class", "axis y");

    // Add y-axis title
    yAxisG
      .append("text")
      .attr("class", "title")
      .attr("transform", "rotate(-90)")
      .attr("fill", "#FFFFFF")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 30)
      .attr("dy", "0.7em")
      .text("Amplitude");
  };

  const drawXGridLines = (
    xAxis: d3.Axis<number>,
    height: number,
    min: number,
    max: number
  ) => {
    const step = data.length > 100000 ? 10000 : 1000;
    return xAxis.tickValues(d3.range(min, max, step)).tickSize(-height);
  };

  const drawYGridLines = (
    yAxis: d3.Axis<number>,
    width: number
  ): d3.Axis<number> => {
    return yAxis.tickValues(d3.range(-1, 1, 0.5)).tickSize(width);
  };

  const arrayMinMax = (arr: Array<number>): [number, number] =>
    arr.reduce(
      ([min, max], val) => [Math.min(min, val), Math.max(max, val)],
      [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
    );

  const initializeChartData = (): void => {
    xScale = d3.scaleLinear([0, width]);
    yScale = d3.scaleLinear([-1.05, 1.05], [height, 0]);

    xAxis = d3.axisBottom<number>(xScale);
    yAxis = d3.axisLeft<number>(yScale);

    xAxisG = d3.select("#xAxisG");
    yAxisG = d3.select("#yAxisG");

    // Scale X-Axis according to data
    const values = data.map((value: LineChartData) => value.i);
    const [minValue, maxValue] = arrayMinMax(values);
    xScale.domain([minValue + (maxValue - initialDataLength), maxValue]);
    //console.log(xScale.domain());

    // Update the axis with modified scale & draw gridlines
    xAxis.scale(xScale)(
      xAxisG.call(drawXGridLines(xAxis, height, minValue, maxValue))
    );
    yAxis.scale(yScale)(yAxisG.call(drawYGridLines(yAxis, width)));

    canvas = d3.select<HTMLCanvasElement, unknown>("#canvas");
    context = canvas.node()?.getContext("2d");
    if (context) {
      context.clearRect(
        0,
        0,
        canvas.node()?.width ?? 0,
        canvas.node()?.height ?? 0
      );
      const line = d3.line().context(context);
      line.x(([d0, _]) => {
        return xScale(d0) ?? 0;
      });
      line.y(([_, d1]) => {
        return yScale(d1) ?? 0;
      });
      context.beginPath();
      line(data.map((val) => [val.i, val.y]));
      context.strokeStyle = theme.palette.action.focus;
      context.lineWidth = 7;
      context.stroke();
    }
  };

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h6">D3 (Canvas)</Typography>
      <Box width="100%" height={400} id="chart-view-div"></Box>
    </AppCard>
  );
};

export default D3Demo;