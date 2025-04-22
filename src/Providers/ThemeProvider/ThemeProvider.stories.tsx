import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ThemeProvider from "./ThemeProvider";
import { useThemeContext } from "./ThemeContext";

// ----------------------------------------------------------------------

const ThemeDemo = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            ThemeProvider Demo
          </Typography>
          <Typography variant="body1" paragraph>
            Current mode: <strong>{mode}</strong>
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            }
            label={`Mode ${mode === "dark" ? "dark" : "light"}`}
          />
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="outlined" color="primary">
          Outlined Button
        </Button>
        <Button variant="text" color="primary">
          Text Button
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Example Card
            </Typography>
            <Typography variant="body2">
              This card shows the appearance of components with the current
              theme.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Typography
            </Typography>
            <Typography variant="h6">Title h6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="body1">Body 1</Typography>
            <Typography variant="body2">Body 2</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

// Configuration de la méta pour Storybook
const meta = {
  title: "Providers/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story principale
export const Default: Story = {
  args: {
    children: null,
    mode: "dark",
    enableCssBaseline: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

// Story avec mode clair par défaut
export const LightMode: Story = {
  args: {
    children: null,
    mode: "light",
    enableCssBaseline: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

// Story avec options de thème personnalisées
export const CustomTheme: Story = {
  args: {
    children: null,
    mode: "dark",
    enableCssBaseline: true,
    themeOptions: {
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "16px",
              textTransform: "none",
            },
          },
        },
      },
    },
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};
