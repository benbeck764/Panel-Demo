import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import ReChartsDemo from "./ReChartsDemo";
import NivoDemo from "./NivoDemo";
import Stack from "@mui/material/Stack";
import ChartJsDemo from "./ChartJsDemo";
import D3Demo from "./D3Demo/D3Demo";

export type LineChartData = {
  i: number;
  y: number;
};

const Dashboard: FC = () => {
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
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
  const dataCount = 501000;
  const initialSplice = dataCount - 1000;
  const newDataHz = 100;

  useEffect(() => {
    // Set wave parameters
    const amplitude = 1; // Amplitude of the wave
    const frequency = 4; // Frequency of the wave
    const phase = 10; // Phase shift of the wave

    // Generate wave-like data
    const waveData = generateWaveData(amplitude, frequency, phase, dataCount);
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
        setMemoryUsage(window.performance.memory.usedJSHeapSize);
      }
    }, 1000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack gap={1}>
      <Typography variant="h3">Dashboard</Typography>
      <Typography variant="paragraphBold">{`Data Points: ${
        data.length
      } | Memory: ${(memoryUsage / 1024 / 1024).toFixed(2)} MB`}</Typography>
      {data.length > 0 && (
        <Stack gap={2}>
          {/* Using ~ 55MB @ 15k DP - With No Visual */}

          {/* Notes: Extremely high memory consumption*/}
          {/* Static: Slow to render ~7s @ 50k DP | Maximum: 50k DP */}
          {/* Dynamic: Using upward of 300+ MB @ 15k DP | Maximum: 15k DP */}
          {/* <ReChartsDemo data={data} initialDataLength={initialSplice} /> */}

          {/* Static: Slow to render ~7s @ 50k DP | Maximum: 50k DP */}
          {/* Dynamic: Using upward of 300+ MB @ 15k DP | Maximum: 15k DP */}
          {/* <NivoDemo data={data} initialDataLength={initialSplice} /> */}

          {/* Static: Okay with render ~7s @ 75k DP | Maximum: 75k DP */}
          {/* Dynamic: Using upward of 75+ MB @ 15k DP | Maximum: 15k DP */}
          {/* <ChartJsDemo data={data} initialDataLength={initialSplice} /> */}

          {/* Static: Okay with render ~1s @ 1M DP | Maximum: ??? DP */}
          <D3Demo data={data} initialDataLength={initialSplice} />
        </Stack>
      )}
    </Stack>
  );
};

export default Dashboard;
