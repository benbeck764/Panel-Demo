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
  const { data, initialDataLength, doubleBuffering } = props;
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

  let offscreenCanvas: d3.Selection<
    HTMLCanvasElement,
    unknown,
    HTMLElement,
    any
  >;
  let offscreenContext: CanvasRenderingContext2D | null | undefined;

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

  const initializeChart = (): void => {
    const viewDiv = d3.select("#chart-view-div");

    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.bottom + margin.top;
    const svg = viewDiv
      .append("svg")
      .attr("id", "svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("position", "absolute");

    canvas = viewDiv
      .append("canvas")
      .attr("id", "canvas")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute");

    offscreenCanvas = viewDiv
      .append("canvas")
      .attr("id", "offscreen-canvas")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute");

    context = canvas.node()?.getContext("2d");
    offscreenContext = offscreenCanvas.node()?.getContext("2d");

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
      .attr("y", 0)
      .attr("dy", "0.7em")
      .text("Amplitude");
  };

  const drawXGridLines = (
    xAxis: d3.Axis<number>,
    height: number,
    min: number,
    max: number
  ) => {
    const step =
      data.length > 5000000
        ? 500000
        : data.length > 500000
        ? 100000
        : data.length > 100000
        ? 10000
        : 1000;
    return xAxis
      .tickValues(d3.range(min, max, step))
      .tickSize(-height)
      .tickFormat((v) => v.toString());
  };

  const drawYGridLines = (
    yAxis: d3.Axis<number>,
    width: number
  ): d3.Axis<number> => {
    return yAxis
      .tickValues(d3.range(-1, 1, 0.5))
      .tickSize(-width)
      .tickFormat((v) => v.toString());
  };

  const arrayMinMax = (arr: Array<number>): [number, number] => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
    }

    return [min, max];
  };

  const initializeChartData = (): void => {
    xScale = d3.scaleLinear([0, width]);
    yScale = d3.scaleLinear([-1, 1], [height, 0]);

    xAxis = d3.axisBottom<number>(xScale);
    yAxis = d3.axisLeft<number>(yScale);

    xAxisG = d3.select("#xAxisG");
    yAxisG = d3.select("#yAxisG");

    // Scale X-Axis according to data
    const values = data.map((value: LineChartData) => value.i);
    const [minValue, maxValue] = arrayMinMax(values);
    xScale.domain([minValue + (maxValue - initialDataLength), maxValue]);

    // Update the axis with modified scale & draw gridlines
    xAxis.scale(xScale)(
      xAxisG.call(drawXGridLines(xAxis, height, minValue, maxValue))
    );
    yAxis.scale(yScale)(yAxisG.call(drawYGridLines(yAxis, width)));

    canvas = d3.select<HTMLCanvasElement, unknown>("#canvas");
    context = canvas.node()?.getContext("2d");

    offscreenCanvas = d3.select<HTMLCanvasElement, unknown>(
      "#offscreen-canvas"
    );
    offscreenContext = offscreenCanvas.node()?.getContext("2d");

    if (doubleBuffering) {
      if (context && offscreenContext) {
        // Clear the off-screen canvas
        offscreenContext.clearRect(
          0,
          0,
          canvas.node()?.width ?? 0,
          canvas.node()?.height ?? 0
        );

        // Draw the entire updated line on the off-screen canvas
        drawLine(data, offscreenContext, xScale, yScale);

        // Swap the off-screen canvas with the on-screen canvas
        context.clearRect(
          0,
          0,
          canvas.node()?.width ?? 0,
          canvas.node()?.height ?? 0
        );
        context.drawImage(offscreenCanvas.node()!, 0, 0);
      }
    } else {
      if (context) {
        context.clearRect(
          0,
          0,
          canvas.node()?.width ?? 0,
          canvas.node()?.height ?? 0
        );

        drawLine(data, context, xScale, yScale);
      }
    }
  };

  const drawLine = (
    data: LineChartData[],
    context: CanvasRenderingContext2D,
    xLinearScale: d3.ScaleLinear<number, number>,
    yLinearScale: d3.ScaleLinear<number, number>
  ): void => {
    const length = data.length;
    const chunkSize = 1000;
    const result: LineChartData[][] = [];

    for (let i = 0; i < length; i += chunkSize) {
      const chunk = [];
      for (let j = 0; j < chunkSize && i + j < length; j++) {
        chunk.push(data[i + j]);
      }
      result.push(chunk);
    }

    const line = d3.line().context(context);
    line.x(([d0, _]) => {
      return xLinearScale(d0) ?? 0;
    });
    line.y(([_, d1]) => {
      return yLinearScale(d1) ?? 0;
    });

    for (let x = 0; x < result.length; x++) {
      const dataChunk = result[x];
      context.beginPath();
      line(dataChunk.map((val) => [val.i, val.y]));
      context.strokeStyle = theme.palette.action.focus;
      context.lineWidth = 5;
      context.stroke();
    }
  };

  return (
    <AppCard sx={{ p: 2, height: 475 }}>
      <Typography variant="h6">D3 (Canvas)</Typography>
      <Box id="chart-view-div" sx={{ my: 2 }}></Box>
    </AppCard>
  );
};

export default D3Demo;
