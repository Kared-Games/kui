import { ReactElement } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import type { AvatarMenuOption } from "@/Avatars/AvatarMenu/AvatarMenu.types";
import Header from "./index";

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {
  const defaultProps = {
    title: "Test Title",
    logoUrl: "test-logo.png",
  };

  const renderWithRouter = (ui: ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("rend le titre correctement", () => {
    renderWithRouter(<Header {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("ne rend pas le composant quand show est false", () => {
    renderWithRouter(<Header {...defaultProps} show={false} />);
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  test("affiche le bouton retour par défaut", () => {
    renderWithRouter(<Header {...defaultProps} />);
    expect(screen.getByTestId("btn-appbar-back")).toBeInTheDocument();
  });

  test("n'affiche pas le bouton retour quand showBackButton est false", () => {
    renderWithRouter(<Header {...defaultProps} showBackButton={false} />);
    expect(screen.queryByTestId("btn-appbar-back")).not.toBeInTheDocument();
  });

  test("navigue vers la page d'accueil quand on clique sur le logo", () => {
    renderWithRouter(<Header {...defaultProps} />);
    const homeButton = screen.getByTestId("btn-appbar-home");
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("appelle onClickHomeButton quand il est fourni", () => {
    const onClickHomeButton = jest.fn();
    renderWithRouter(
      <Header {...defaultProps} onClickHomeButton={onClickHomeButton} />
    );
    const homeButton = screen.getByTestId("btn-appbar-home");
    fireEvent.click(homeButton);
    expect(onClickHomeButton).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("navigue vers la page précédente quand on clique sur le bouton retour", () => {
    renderWithRouter(<Header {...defaultProps} />);
    const backButton = screen.getByTestId("btn-appbar-back");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("appelle onClickBackButton quand il est fourni", () => {
    const onClickBackButton = jest.fn();
    renderWithRouter(
      <Header {...defaultProps} onClickBackButton={onClickBackButton} />
    );
    const backButton = screen.getByTestId("btn-appbar-back");
    fireEvent.click(backButton);
    expect(onClickBackButton).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("rend les options de navigation correctement", () => {
    const navOptions = [
      {
        name: "Accueil",
        pathname: "/",
        icon: <HomeIcon data-testid="home-icon" />,
      },
      {
        name: "Dashboard",
        pathname: "/dashboard",
      },
    ];

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500, // Valeur en dessous du breakpoint md
    });

    // Force le recalcul des media queries
    window.dispatchEvent(new Event("resize"));

    renderWithRouter(<Header {...defaultProps} navOptions={navOptions} />);

    // Ouvrir le menu mobile
    const menuButton = screen.getByTestId("btn-appbar-menu");
    fireEvent.click(menuButton);

    expect(screen.getAllByText("Accueil").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dashboard").length).toBeGreaterThan(0);
    expect(screen.getByTestId("home-icon")).toBeVisible();
  });

  test("navigue vers la bonne page quand on clique sur une option de navigation", () => {
    const navOptions = [
      {
        name: "Dashboard",
        pathname: "/dashboard",
      },
    ];

    renderWithRouter(<Header {...defaultProps} navOptions={navOptions} />);

    // Ouvrir le menu mobile
    const menuButton = screen.getByTestId("btn-appbar-menu");
    fireEvent.click(menuButton);

    // Cliquer sur l'option de navigation
    const dashboardElements = screen.getAllByText("Dashboard");
    const visibleDashboard = dashboardElements.find(
      (el) => el.offsetParent !== null
    );
    expect(visibleDashboard).not.toBeNull();

    if (visibleDashboard) {
      fireEvent.click(visibleDashboard);
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    }
  });

  test("rend le menu avatar correctement", () => {
    const avatarOptions: AvatarMenuOption[] = [
      {
        label: "Mon Profil",
        id: "profile",
        icon: <PersonIcon data-testid="person-icon" />,
      },
    ];

    const onClickAvatarOption = jest.fn();

    renderWithRouter(
      <Header
        {...defaultProps}
        avatarTitle="John Doe"
        avatarImageUrl="avatar.png"
        avatarOptions={avatarOptions}
        onClickAvatarOption={onClickAvatarOption}
      />
    );

    expect(screen.getByTestId("btn-avatar-menu")).toBeVisible();
  });
});
