import { render, screen, fireEvent } from "@testing-library/react";
import { Button, Box } from "@mui/material";
import ThemeProvider, { useTheme } from "./index";

// Composant de test pour accéder au contexte du thème
const TestComponent = () => {
  const { mode, theme, toggleTheme, setMode } = useTheme();

  return (
    <Box>
      <div data-testid="theme-mode">{mode}</div>
      <div data-testid="theme-palette-mode">{theme.palette.mode}</div>
      <div data-testid="primary-color">{theme.palette.primary.main}</div>
      <Button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      <Button data-testid="set-light" onClick={() => setMode("light")}>
        Set Light
      </Button>
      <Button data-testid="set-dark" onClick={() => setMode("dark")}>
        Set Dark
      </Button>
    </Box>
  );
};

describe("ThemeProvider", () => {
  it("devrait fournir le mode sombre par défaut", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("theme-palette-mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("primary-color")).toHaveTextContent("#8494FF");
  });

  it("devrait permettre de définir le mode initial", () => {
    render(
      <ThemeProvider mode="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("light");
    expect(screen.getByTestId("theme-palette-mode")).toHaveTextContent("light");
    expect(screen.getByTestId("primary-color")).toHaveTextContent("#2b239c");
  });

  it("devrait basculer entre les modes clair et sombre", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Vérifier le mode initial (sombre)
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");

    // Basculer vers le mode clair
    fireEvent.click(screen.getByTestId("toggle-theme"));
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("light");
    expect(screen.getByTestId("theme-palette-mode")).toHaveTextContent("light");
    expect(screen.getByTestId("primary-color")).toHaveTextContent("#2b239c");

    // Basculer vers le mode sombre
    fireEvent.click(screen.getByTestId("toggle-theme"));
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("theme-palette-mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("primary-color")).toHaveTextContent("#8494FF");
  });

  it("devrait permettre de définir directement le mode", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Définir le mode clair
    fireEvent.click(screen.getByTestId("set-light"));
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("light");

    // Définir le mode sombre
    fireEvent.click(screen.getByTestId("set-dark"));
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
  });

  it("devrait appliquer les options de thème personnalisées", () => {
    const customThemeOptions = {
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "20px",
            },
          },
        },
      },
    };

    const ButtonTest = () => {
      const { theme } = useTheme();
      const borderRoot = theme.components?.MuiButton?.styleOverrides
        ?.root as unknown as { borderRadius: string };

      return (
        <Button data-testid="button-border-radius">
          {borderRoot?.borderRadius as string}
        </Button>
      );
    };

    render(
      <ThemeProvider themeOptions={customThemeOptions}>
        <ButtonTest />
      </ThemeProvider>
    );

    expect(screen.getByTestId("button-border-radius")).toHaveTextContent(
      "20px"
    );
  });

  it("devrait rendre CssBaseline par défaut", () => {
    // Ce test est plus difficile à vérifier directement, mais nous pouvons vérifier
    // que le composant se rend sans erreur avec CssBaseline activé
    expect(() => {
      render(
        <ThemeProvider>
          <div>Test content</div>
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  it("devrait permettre de désactiver CssBaseline", () => {
    // Similaire au test précédent, nous vérifions que le rendu se fait sans erreur
    expect(() => {
      render(
        <ThemeProvider enableCssBaseline={false}>
          <div>Test content</div>
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
