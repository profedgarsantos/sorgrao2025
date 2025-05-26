import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Verde para representar agricultura
      light: "#60ad5e",
      dark: "#005005",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffa000", // Amarelo/dourado para representar grãos
      light: "#ffd149",
      dark: "#c67100",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
  },
})

export default theme
