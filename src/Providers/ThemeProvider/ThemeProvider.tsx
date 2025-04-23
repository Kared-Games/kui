import { useCallback, useReducer, useMemo } from "react";
import { ThemeProvider as ThemeMui, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import deepmerge from "@mui/utils/deepmerge";
import defaultConfig from "./config/theme";
import paletteDark from "./config/palette.dark";
import paletteLight from "./config/palette.light";
import { ThemeContext, themeReducer, initialState } from "./ThemeContext";
import type { ThemeMode } from "./ThemeContext.types";
import type { ThemeProviderProps } from "./ThemeProvider.types";

/**
 * Theme context provider
 *
 * This component provides a theme context to its children.
 *
 * ```tsx
 * import { ThemeProvider } from "@kui/Providers/ThemeProvider";
 *
 * <ThemeProvider>
 *  <App />
 * </ThemeProvider>
 * ```
 */
function ThemeProvider({
  children,
  mode = initialState.mode,
  themeOptions = {},
  enableCssBaseline = true,
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, { ...initialState, mode });

  // ----------------------------------------------------------------------

  const toggleTheme = useCallback(() => {
    dispatch({
      type: "SET_MODE",
      payload: state.mode === "light" ? "dark" : "light",
    });
  }, [state.mode]);

  const setMode = useCallback((mode: ThemeMode) => {
    dispatch({ type: "SET_MODE", payload: mode });
  }, []);

  // ----------------------------------------------------------------------

  const theme = useMemo(() => {
    const themeMode = state.mode;

    const defaultPalette = themeMode === "dark" ? paletteDark : paletteLight;
    const palette = themeOptions.palette
      ? themeOptions.palette
      : defaultPalette;

    return createTheme({
      ...defaultConfig,
      ...themeOptions,
      palette,
      components: deepmerge(
        defaultConfig.components || {},
        themeOptions.components || {}
      ),
    });
  }, [state.mode, themeOptions]);

  const value = useMemo(
    () => ({
      mode: state.mode,
      theme,
      toggleTheme,
      setMode,
    }),
    [state.mode, theme, toggleTheme, setMode]
  );

  // ----------------------------------------------------------------------

  return (
    <ThemeContext.Provider value={value}>
      <ThemeMui theme={theme}>
        {enableCssBaseline && <CssBaseline />}
        {children}
      </ThemeMui>
    </ThemeContext.Provider>
  );
}

// ----------------------------------------------------------------------

export default ThemeProvider;
