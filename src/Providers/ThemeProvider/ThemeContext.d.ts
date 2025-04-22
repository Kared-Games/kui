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
   * Toggle theme mode
   */
  toggleTheme: () => void;
  /**
   * Set theme mode
   */
  setMode: (mode: ThemeMode) => void;
}
