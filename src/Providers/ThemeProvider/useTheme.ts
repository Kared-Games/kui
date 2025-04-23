import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

/**
 * Use theme context
 * @returns Theme context
 */
function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export { useTheme };

// import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";

// /**
//  * Use theme context
//  * @returns Theme context
//  */
// const useTheme = () => useContext(ThemeContext);

// // ----------------------------------------------------------------------

// export { useTheme };
