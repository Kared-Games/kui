import { useState, useCallback, useMemo, MouseEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { AvatarMenuProps, AvatarMenuOption } from "./AvatarMenu.types";

/**
 * AvatarMenu component
 *
 * Dropdown menu component with avatar that displays a customizable list of options
 * with icons and labels. Ideal for user profile menus.
 */
function AvatarMenu({
  id,
  title,
  imageUrl,
  options,
  sx,
  onClickOption,
  ...props
}: AvatarMenuProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  // ----------------------------------------------------------------------

  const handleOpenUserMenu = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      setAnchorElUser(ev.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleClickUserMenu = useCallback(
    (item: AvatarMenuOption) => {
      handleCloseUserMenu();

      onClickOption(item);
    },
    [handleCloseUserMenu, onClickOption]
  );

  // ----------------------------------------------------------------------

  const menuItems = useMemo(
    () =>
      options.map((item: AvatarMenuOption, idx: number) => (
        <MenuItem
          id={item.id}
          key={idx}
          onClick={() => handleClickUserMenu(item)}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
        </MenuItem>
      )),
    [options, handleClickUserMenu]
  );

  // ----------------------------------------------------------------------

  if (!menuItems.length) return null;

  // ----------------------------------------------------------------------

  return (
    <Box id={id} {...props} sx={{ flexGrow: 0, ...sx }}>
      <Tooltip title={title}>
        <IconButton
          id="avatar-menu"
          data-testid="btn-avatar-menu"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Avatar alt={title} src={imageUrl} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        keepMounted
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleCloseUserMenu}
      >
        {menuItems}
      </Menu>
    </Box>
  );
}

// ----------------------------------------------------------------------

export default AvatarMenu;
