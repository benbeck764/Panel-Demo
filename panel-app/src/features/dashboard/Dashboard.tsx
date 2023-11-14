/* eslint-disable @typescript-eslint/no-unused-vars */
import Typography from "@mui/material/Typography";
import { FC, Profiler, useEffect, useState } from "react";
import ReChartsDemo from "./ReChartsDemo";
import NivoDemo from "./NivoDemo";
import Stack from "@mui/material/Stack";
import ChartJsDemo from "./ChartJsDemo";
import D3Demo from "./D3Demo/D3Demo";
import AntDemo from "./AntDemo";

export type LineChartData = {
  i: number;
  y: number;
};

const Dashboard: FC = () => {
  const [memory, setMemory] = useState<number[]>([]);
  const memoryUsage = memory[memory.length - 1] ?? 0;
  const memoryMax = Math.max(...memory, 0);
  const memoryAverage =
    memory.length > 0
      ? memory.reduce((acc, num) => acc + num, 0) / memory.length
      : 0;
  const [initialRenderTime, setInitialRenderTime] = useState<number | null>(
    null
  );
  const [data, setData] = useState<LineChartData[]>([]);

  const generateWaveData = (
    amplitude: number,
    frequency: number,
    phase: number,
    count: number
  ) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const x = (i / count) * 2 * Math.PI; // Adjust the factor to control the width of the wave
      const y = amplitude * Math.sin(frequency * x + phase);
      data.push({ i, y });
    }
    return data;
  };

  const STATIC_DATA = false;
  const realTimeDataCount = 100000;
  const initialDataCount = 1000000 + realTimeDataCount;
  const newDataHz = 1000;

  const initialSplice = initialDataCount - realTimeDataCount;

  useEffect(() => {
    // Set wave parameters
    const amplitude = 1; // Amplitude of the wave
    const frequency = 4; // Frequency of the wave
    const phase = 0; // Phase shift of the wave

    // Generate wave-like data
    const waveData = generateWaveData(
      amplitude,
      frequency,
      phase,
      initialDataCount
    );
    const initialData = waveData.splice(0, initialSplice);
    setData(initialData);

    const intervalId = setInterval(() => {
      if (!STATIC_DATA) {
        const newData = waveData.splice(0, newDataHz);
        if (newData.length) {
          setData((prev) => [...prev, ...newData]);
        } else {
          clearInterval(intervalId);
        }
      }

      // @ts-expect-error memory does not exist
      if (window.performance && window.performance.memory) {
        // @ts-expect-error memory does not exist
        const heapSize = window.performance.memory.usedJSHeapSize;
        setMemory((prev) => [...prev, heapSize]);
      }
    }, 1000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnRender = (
    _id: string,
    phase: "mount" | "update",
    _actualDuration: number,
    _baseDuration: number,
    _startTime: number,
    commitTime: number
  ): void => {
    if (!initialRenderTime && phase === "update") {
      setInitialRenderTime(commitTime);
    }
  };

  return (
    <Stack gap={1}>
      <Typography variant="h3">Dashboard</Typography>
      <Typography variant="paragraphBold">{`Data Points: ${data.length} (${
        STATIC_DATA ? "Static" : `Dynamic: ${newDataHz} Hz`
      })`}</Typography>
      <Typography variant="paragraphBold">{`Initial Render: ${
        initialRenderTime ? `${Math.round(initialRenderTime)} ms` : "-"
      }`}</Typography>
      <Typography variant="paragraphBold">
        {`Heap Size: ${(memoryUsage / 1024 / 1024).toFixed(2)} MB`}
        {" | "}
        <Typography
          color="#00C853"
          variant="paragraphBold"
          component="span"
        >{`Average Heap Size: ${(memoryAverage / 1024 / 1024).toFixed(
          2
        )} MB`}</Typography>
        {" | "}
        <Typography
          color="error"
          variant="paragraphBold"
          component="span"
        >{`Max Heap Size: ${(memoryMax / 1024 / 1024).toFixed(
          2
        )} MB`}</Typography>
      </Typography>

      {data.length > 0 && (
        <Stack gap={2}>
          <Profiler id="Chart" onRender={handleOnRender}>
            {/* Using ~20-25MB @ 15k DP - With No Visual */}

            {/* Notes: Extremely high memory consumption */}
            {/* Static: Slow to render ~7s @ 50k DP | Maximum: 50k DP */}
            {/* Dynamic: Using upward of 300+ MB @ 15k DP | Maximum: 15k DP */}
            {/* <ReChartsDemo data={data} initialDataLength={initialSplice} /> */}

            {/* Static: Slow to render ~7s @ 50k DP | Maximum: 50k DP */}
            {/* Dynamic: Using upward of 300+ MB @ 15k DP | Maximum: 15k DP */}
            {/* <NivoDemo data={data} initialDataLength={initialSplice} /> */}

            {/* Static: Okay with render ~2s @ 1M DP | Maximum: ??? DP */}
            {/* Dynamic: Using upward of 900+ MB @ 1M DP | Maximum: 1M+ DP */}
            {/* <ChartJsDemo data={data} initialDataLength={initialSplice} /> */}

            {/* Static: Okay with render ~6s @ 500k DP | Maximum: 500k+ DP */}
            {/* Dynamic: Using upward of 250+ MB @ 100k DP | Maximum: 100k DP */}
            {/* <AntDemo data={data} initialDataLength={initialSplice} /> */}

            {/* Static: Okay with render ~1s @ 1M DP | Maximum: ??? DP */}
            {/* Dynamic: Using upward of 400+ MB @ 1M DP | Maximum: 1M+ DP */}
            <D3Demo
              data={data}
              initialDataLength={initialSplice}
              doubleBuffering={true}
            />
          </Profiler>
        </Stack>
      )}
    </Stack>
  );
};

export default Dashboard;
