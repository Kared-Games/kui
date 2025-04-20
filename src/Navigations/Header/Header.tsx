import { useState, useCallback, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIos";
import AvatarMenu from "@/Avatars/AvatarMenu";
import { HeaderProps, NavOption } from "./Header.d";

/**
 * Header component
 *
 * Navigation bar with a customizable title, navigation options, and avatar menu.
 */
function Header({
  title,
  logoUrl,
  show = true,
  showBackButton = true,
  showHomeButton = true,
  navOptions,
  avatarTitle,
  avatarImageUrl,
  avatarOptions,
  onClickHomeButton,
  onClickBackButton,
  onClickAvatarOption,
}: HeaderProps) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const showMenuButton = !!navOptions?.length;

  // ----------------------------------------------------------------------

  const handleNavHome = useCallback(() => {
    if (onClickHomeButton) {
      onClickHomeButton();
    } else {
      navigate("/");
    }
  }, [navigate, onClickHomeButton]);

  const handleGoBack = useCallback(() => {
    if (onClickBackButton) {
      onClickBackButton();
    } else {
      navigate(-1);
    }
  }, [navigate, onClickBackButton]);

  const handleOpenNavMenu = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(ev.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleClickPage = useCallback(
    (item: NavOption) => {
      navigate(item.pathname);
    },
    [navigate]
  );

  // ----------------------------------------------------------------------

  if (!show) return null;

  // ----------------------------------------------------------------------

  return (
    <ResponsiveAppBar
      id="navbar"
      position="sticky"
      sx={{ top: 0, paddingTop: "env(safe-area-inset-top)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              "& > *:first-of-type": { pl: 0 },
            }}
          >
            {/* Logo permettant de revenir à la page d'accueil */}
            {(showHomeButton || (!showMenuButton && !showBackButton)) && (
              <IconButton
                id="btn-appbar-home"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleNavHome}
                color="inherit"
                sx={{ p: 0 }}
              >
                <img src={logoUrl} alt="logo" width="40px" height="40px" />
              </IconButton>
            )}

            {/* Menu de navigation mobile */}
            {showMenuButton && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  keepMounted
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {navOptions.map((item: NavOption, idx: number) => (
                    <MenuItem key={idx} onClick={() => handleClickPage(item)}>
                      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          {/* Bouton permettant de revenir à la page précédente */}
          {showBackButton && (
            <IconButton
              id="btn-appbar-back"
              size="large"
              aria-controls="menu-appbar"
              sx={{ p: 1, opacity: 0.5 }}
              onClick={handleGoBack}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Titre de la page */}
          <Typography
            noWrap
            variant="h1"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          {/* Menu de navigation web */}
          {navOptions && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navOptions.map((item: NavOption, idx: number) => (
                <Button
                  key={idx}
                  onClick={() => handleClickPage(item)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Menu de navigation utilisateur */}
          {avatarTitle && avatarOptions && onClickAvatarOption && (
            <AvatarMenu
              title={avatarTitle}
              imageUrl={avatarImageUrl}
              options={avatarOptions}
              onClickOption={onClickAvatarOption}
            />
          )}
        </Toolbar>
      </Container>
    </ResponsiveAppBar>
  );
}

// ----------------------------------------------------------------------

export default Header;
