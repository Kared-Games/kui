import type { Meta, StoryObj } from "@storybook/react";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarMenu from "./index";

// ----------------------------------------------------------------------

const meta: Meta<typeof AvatarMenu> = {
  title: "Avatars/AvatarMenu",
  component: AvatarMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClickOption: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarMenu>;

// ----------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: "User Profile",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    options: [
      {
        label: "My Profile",
        id: "profile",
        icon: <PersonIcon />,
      },
      {
        label: "Settings",
        id: "settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Logout",
        id: "logout",
        icon: <LogoutIcon />,
      },
    ],
  },
};

export const WithoutImage: Story = {
  args: {
    title: "User Profile",
    options: [
      {
        label: "My Profile",
        id: "profile",
        icon: <PersonIcon />,
      },
      {
        label: "Settings",
        id: "settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Logout",
        id: "logout",
        icon: <LogoutIcon />,
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    title: "User Profile",
    imageUrl: "https://i.pravatar.cc/150?img=8",
    options: [
      {
        label: "My Profile",
        id: "profile",
      },
      {
        label: "Settings",
        id: "settings",
      },
      {
        label: "Logout",
        id: "logout",
      },
    ],
  },
};

export const CustomStyling: Story = {
  args: {
    title: "User Profile",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    options: [
      {
        label: "My Profile",
        id: "profile",
        icon: <PersonIcon />,
      },
      {
        label: "Settings",
        id: "settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Logout",
        id: "logout",
        icon: <LogoutIcon />,
      },
    ],
    sx: {
      "& .MuiAvatar-root": {
        width: 56,
        height: 56,
        border: "2px solid #1976d2",
      },
    },
  },
};
