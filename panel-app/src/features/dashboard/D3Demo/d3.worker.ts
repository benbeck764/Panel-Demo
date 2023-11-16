/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from "@mui/material/styles";
import { LineChartData } from "../Dashboard";
import * as d3 from "d3";

// type DrawLineMessage = {
//   data: LineChartData[];
//   context: CanvasRenderingContext2D;
//   xLinearScale: d3.ScaleLinear<number, number>;
//   yLinearScale: d3.ScaleLinear<number, number>;
//   theme: Theme;
// };

export const drawLine = (
  data: LineChartData[],
  width: number,
  height: number,
  color: string,
  initialDataLength: number
): ImageData | undefined => {
  const offscreenCanvas = new OffscreenCanvas(width, height);
  const context = offscreenCanvas.getContext("2d");
  console.log("bruh");
  if (!context) return;

  const xScale = d3.scaleLinear([0, width]);
  const yScale = d3.scaleLinear([-1, 1], [height, 0]);

  const values = data.map((value: LineChartData) => value.i);
  const [minValue, maxValue] = arrayMinMax(values);
  xScale.domain([minValue + (maxValue - initialDataLength), maxValue]);

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

  const line = d3
    .line()
    .context(context as unknown as CanvasRenderingContext2D);
  line.x(([d0, _]) => {
    return xScale(d0) ?? 0;
  });
  line.y(([_, d1]) => {
    return yScale(d1) ?? 0;
  });

  for (let x = 0; x < result.length; x++) {
    const dataChunk = result[x];
    context.beginPath();
    line(dataChunk.map((val) => [val.i, val.y]));
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.stroke();
  }

  return context.getImageData(
    0,
    0,
    offscreenCanvas.width,
    offscreenCanvas.height
  );
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
