/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppCard from "@benbeck764/react-components/Card";
import { useTheme } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
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

  // let canvas: d3.Selection<HTMLCanvasElement, unknown, HTMLElement, any>;
  // let context: CanvasRenderingContext2D | null | undefined;

  // let xAxisG: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // let xScale: d3.ScaleLinear<number, number>;
  // let xAxis: d3.Axis<number>;

  // let yAxisG: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // let yScale: d3.ScaleLinear<number, number>;
  // let yAxis: d3.Axis<number>;

  const [canvas, setCanvas] =
    useState<d3.Selection<HTMLCanvasElement, unknown, HTMLElement, any>>();
  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >(null);
  const [xAxisG, setXAxisG] =
    useState<d3.Selection<SVGGElement, unknown, HTMLElement, any>>();
  const [xScale, setXScale] = useState<d3.ScaleLinear<number, number>>();
  const [xAxis, setXAxis] = useState<d3.Axis<number>>();

  const [yAxisG, setYAxisG] =
    useState<d3.Selection<SVGGElement, unknown, HTMLElement, any>>();
  const [yScale, setYScale] = useState<d3.ScaleLinear<number, number>>();
  const [yAxis, setYAxis] = useState<d3.Axis<number>>();

  useEffect(() => {
    d3.select("#svg").remove();
    d3.select("#canvas").remove();
    initializeChart();
    console.log("useEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(xScale);
    if (data && data.length) initializeChartData();
    console.log("useEffect[data]");
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
      .attr("class", "axis x")
      .attr("transform", `translate(0,${height})`);

    // Add group for y-axis
    yAxisG = mainG.append("g").attr("class", "axis y");

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

    xScale = d3.scaleLinear([0, width]);
    yScale = d3.scaleLinear([-1.05, 1.05], [height, 0]);

    xAxis = d3.axisBottom<number>(xScale);
    yAxis = d3.axisLeft<number>(yScale);
  };

  const drawXGridLines = (
    xAxis: d3.Axis<number>,
    height: number,
    min: number,
    max: number
  ) => {
    return xAxis.tickValues(d3.range(min, max, 1000)).tickSize(-height);
  };

  const drawYGridLines = (
    yAxis: d3.Axis<number>,
    width: number
  ): d3.Axis<number> => {
    return yAxis.tickValues(d3.range(-1, 1, 0.5)).tickSize(width);
  };

  const initializeChartData = (): void => {
    if (!xScale) return; // [TODO]

    // Scale X-Axis according to data
    const minValue = Math.min(...data.map((value: LineChartData) => value.i));
    const maxValue = Math.max(...data.map((value: LineChartData) => value.i));
    xScale.domain([minValue + (maxValue - initialDataLength), maxValue]);
    //console.log(xScale.domain());

    // Update the axis with modified scale & draw gridlines
    xAxis.scale(xScale)(
      xAxisG.call(drawXGridLines(xAxis, height, minValue, maxValue))
    );
    yAxis.scale(yScale)(yAxisG.call(drawYGridLines(yAxis, width)));

    if (context) {
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
