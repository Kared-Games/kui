import { PaletteOptions } from "@mui/material/styles";

/**
 * Palette configuration
 * @see https://mui.com/material-ui/customization/color
 */
const config: PaletteOptions = {
  mode: "dark",
  primary: {
    light: "#A8B4FF", // Bleu ciel lumineux
    main: "#8494FF", // Bleu ciel vif
    dark: "#5C69B3", // Bleu ciel foncé
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  secondary: {
    light: "#4B5399", // Indigo profond
    main: "#343B7A", // Indigo intense
    dark: "#252B5C", // Indigo très foncé
    contrastText: "#fff",
  },
  background: {
    default: "#0A0A3C",
    paper: "#0A0A3C",
  },
};

// ----------------------------------------------------------------------

export default config;
