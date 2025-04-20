import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";

// ----------------------------------------------------------------------

const meta: Meta<typeof Header> = {
  title: "Navigations/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    onClickHomeButton: { action: "clicked home" },
    onClickBackButton: { action: "clicked back" },
    onClickAvatarOption: { action: "clicked avatar option" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: "Home",
    logoUrl: "https://i.pravatar.cc/150?img=9",
    show: true,
    showBackButton: true,
    showHomeButton: true,
  },
};

export const WithNavOptions: Story = {
  args: {
    title: "Dashboard",
    logoUrl: "https://i.pravatar.cc/150?img=9",
    navOptions: [
      {
        name: "Accueil",
        pathname: "/",
        icon: <HomeIcon />,
      },
      {
        name: "Dashboard",
        pathname: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        name: "À propos",
        pathname: "/about",
        icon: <InfoIcon />,
      },
    ],
  },
};

export const WithAvatarMenu: Story = {
  args: {
    title: "Profil Utilisateur",
    logoUrl: "https://i.pravatar.cc/150?img=9",
    avatarTitle: "John Doe",
    avatarImageUrl: "https://i.pravatar.cc/150?img=3",
    avatarOptions: [
      {
        label: "Mon Profil",
        id: "profile",
        icon: <PersonIcon />,
      },
      {
        label: "Paramètres",
        id: "settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Déconnexion",
        id: "logout",
        icon: <LogoutIcon />,
      },
    ],
  },
};

export const WithoutBackButton: Story = {
  args: {
    title: "Page Sans Retour",
    logoUrl: "https://i.pravatar.cc/150?img=9",
    showBackButton: false,
  },
};

export const WithoutHomeButton: Story = {
  args: {
    title: "Page Sans Accueil",
    showHomeButton: false,
  },
};

export const CompleteHeader: Story = {
  args: {
    title: "Application Complète",
    logoUrl: "https://i.pravatar.cc/150?img=9",
    navOptions: [
      {
        name: "Accueil",
        pathname: "/",
        icon: <HomeIcon />,
      },
      {
        name: "Dashboard",
        pathname: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        name: "À propos",
        pathname: "/about",
        icon: <InfoIcon />,
      },
    ],
    avatarTitle: "John Doe",
    avatarImageUrl: "https://i.pravatar.cc/150?img=3",
    avatarOptions: [
      {
        label: "Mon Profil",
        id: "profile",
        icon: <PersonIcon />,
      },
      {
        label: "Paramètres",
        id: "settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Déconnexion",
        id: "logout",
        icon: <LogoutIcon />,
      },
    ],
  },
};
