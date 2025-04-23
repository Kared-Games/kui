import { createContext } from "react";
import { createTheme } from "@mui/material/styles";
import type { ThemeContextType, ThemeMode } from "./ThemeContext.types";

/**
 * Theme context
 */
export const initialState: ThemeContextType = {
  mode: "dark",
  theme: createTheme(),
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
