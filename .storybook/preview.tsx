import { createElement } from "react";
import type { Preview, Decorator } from "@storybook/react";
import ThemeProvider from "../src/Providers/ThemeProvider";

/**
 * Decorator to apply the ThemeProvider to all stories
 * @param Story - Story component
 * @param context - Storybook context
 * @returns ThemeProvider wrapped Story component
 */
const withThemeProvider: Decorator = (Story, context) => {
  const { theme } = context.globals;

  return <ThemeProvider mode={theme}>{createElement(Story)}</ThemeProvider>;
};

/**
 * Storybook preview configuration
 */
const preview: Preview = {
  decorators: [withThemeProvider],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Theme global for components",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "light" },
          { value: "dark", icon: "moon", title: "dark" },
        ],
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// ----------------------------------------------------------------------

export default preview;
