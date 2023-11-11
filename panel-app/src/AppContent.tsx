import { FC } from "react";
import { AppRouting } from "./routing/AppRouting";
import Stack from "@mui/material/Stack";
import {
  StyledStickyHeaderContainer,
  StyledPageContainer,
  StyledPageContent,
} from "./App.styles";
import { Header } from "./features/site/Header/Header";

const AppContent: FC = () => {
  return (
    <Stack>
      <StyledStickyHeaderContainer>
        <Header />
      </StyledStickyHeaderContainer>

      <StyledPageContainer
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        wrap="nowrap"
      >
        <StyledPageContent>
          <AppRouting />
        </StyledPageContent>
      </StyledPageContainer>
    </Stack>
  );
};

export default AppContent;
