import { ReactNode } from "react";
import { ThemeOptions } from "@mui/material/styles";

/**
 * Props for the ThemeProvider component
 * @param children - Content to wrap with the theme
 * @param themeOptions - Additional theme options to extend or replace the default configuration
 * @param enableCssBaseline - Enable or disable CssBaseline (reset CSS of MUI)
 */
export type ThemeProviderProps = {
  /**
   * Content to wrap with the theme
   */
  children: ReactNode;
  /**
   * Initial theme mode
   * @default "dark"
   */
  mode?: "light" | "dark";
  /**
   * Additional theme options to extend or replace the default configuration
   */
  themeOptions?: ThemeOptions;
  /**
   * Enable or disable CssBaseline (reset CSS of MUI)
   * @default true
   */
  enableCssBaseline?: boolean;
};
