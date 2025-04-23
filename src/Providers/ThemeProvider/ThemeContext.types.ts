import { Theme } from "@mui/material/styles";

/**
 * Theme mode
 */
export type ThemeMode = "light" | "dark";

/**
 * Theme context type
 */
export interface ThemeContextType {
  /**
   * Current theme mode
   */
  mode: ThemeMode;
  /**
   * Current theme
   */
  theme: Theme;
  /**
   * Toggle theme mode
   */
  toggleTheme: () => void;
  /**
   * Set theme mode
   */
  setMode: (mode: ThemeMode) => void;
}
