import AppCard from "@benbeck764/react-components/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const Home: FC = () => {
  return (
    <AppCard sx={{ p: 2 }}>
      <Stack gap={1}>
        <Typography variant="h3">True Anomaly Panel Demo App</Typography>
        <Typography variant="h6">
          A demonstration of Unity/JavaScript as well as real-time data
          visualizations.
        </Typography>
      </Stack>
    </AppCard>
  );
};

export default Home;
