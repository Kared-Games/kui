import { createContext, useContext } from "react";
import { ThemeContextType, ThemeMode } from "./ThemeContext.d";

/**
 * Theme context
 */
export const initialState: ThemeContextType = {
  mode: "dark",
  toggleTheme: () => {},
  setMode: () => {},
};
export const ThemeContext = createContext<ThemeContextType>(initialState);

/**
 * Theme reducer
 * @param state - Theme context
 * @param action - Theme action
 * @returns Theme context
 */
type ActionType = { type: "SET_MODE"; payload: ThemeMode };

export const themeReducer = (state: ThemeContextType, action: ActionType) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

/**
 * Use theme context
 * @returns Theme context
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }

  return context;
}
