import { Inter } from "next/font/google";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"]
});

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: `${colors.white}`
    },
    primary: {
      main: `${colors.primary}`,
      dark: `${colors.darkPrimary}`
    },
    secondary: {
      main: `${colors.secondary}`,
      dark: `${colors.darkSecondary}`
    },
    text: {
      primary: `${colors.black}`
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: inter.style.fontFamily
        }
      }
    }
  }
};

export const theme = createTheme(themeOptions);
