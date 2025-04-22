import { addons } from "@storybook/manager-api";
import { customTheme } from "./customTheme";

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "right",
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme: customTheme,
  selectedPanel: undefined,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
  },
});
