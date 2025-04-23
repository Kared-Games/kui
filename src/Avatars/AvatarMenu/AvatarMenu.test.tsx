import { render, screen, fireEvent } from "@testing-library/react";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarMenu from "./index";

describe("AvatarMenu", () => {
  const mockOptions = [
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
  ];

  const mockOnClickOption = jest.fn();

  beforeEach(() => {
    mockOnClickOption.mockClear();
  });

  test("affiche l'avatar avec l'image fournie", () => {
    render(
      <AvatarMenu
        title="User Profile"
        imageUrl="https://i.pravatar.cc/150?img=3"
        options={mockOptions}
        onClickOption={mockOnClickOption}
      />
    );

    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://i.pravatar.cc/150?img=3");
    expect(avatar).toHaveAttribute("alt", "User Profile");
  });

  test("affiche les options du menu lorsqu'on clique sur l'avatar", () => {
    render(
      <AvatarMenu
        title="User Profile"
        options={mockOptions}
        onClickOption={mockOnClickOption}
      />
    );

    // Le menu devrait être fermé initialement
    expect(screen.queryByText("My Profile")).not.toBeVisible();

    // Cliquer sur l'avatar
    const avatar = screen.getByRole("button");
    fireEvent.click(avatar);

    // Vérifier que les options sont maintenant visibles
    expect(screen.getByText("My Profile")).toBeVisible();
    expect(screen.getByText("Settings")).toBeVisible();
    expect(screen.getByText("Logout")).toBeVisible();
  });

  test("appelle onClickOption avec l'ID correct lorsqu'une option est cliqué", () => {
    render(
      <AvatarMenu
        title="User Profile"
        options={mockOptions}
        onClickOption={mockOnClickOption}
      />
    );

    // Ouvrir le menu
    const avatar = screen.getByRole("button");
    fireEvent.click(avatar);

    // Cliquer sur une option
    const profileOption = screen.getByText("My Profile");
    fireEvent.click(profileOption);

    // Vérifier que onClickOption a été appelé avec le bon ID
    expect(mockOnClickOption).toHaveBeenCalledWith(mockOptions[0]);
  });

  test("applique les styles personnalisés via la prop sx", () => {
    const customSx = {
      "& .MuiAvatar-root": {
        width: 56,
        height: 56,
        border: "2px solid #1976d2",
      },
    };

    render(
      <AvatarMenu
        title="User Profile"
        options={mockOptions}
        onClickOption={mockOnClickOption}
        sx={customSx}
      />
    );
  });

  test("ne rend pas le composant si les options sont vides", () => {
    render(
      <AvatarMenu
        title="User Profile"
        options={[]}
        onClickOption={mockOnClickOption}
      />
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
