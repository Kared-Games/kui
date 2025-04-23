import { ThemeOptions } from "@mui/material/styles";
import components from "./components";
import palette from "./palette.dark";
import typography from "./typography";

/**
 * Theme configuration
 * @see https://mui.com/material-ui/customization/theming
 */
const config: ThemeOptions = {
  /**
   * @see https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
   */
  components,

  /**
   * @see https://mui.com/material-ui/customization/color
   */
  palette,

  /**
   * @see https://mui.com/material-ui/customization/typography
   */
  typography,
};

// ----------------------------------------------------------------------

export default config;
