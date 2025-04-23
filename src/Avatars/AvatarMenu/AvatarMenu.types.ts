import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";

/**
 * Avatar menu option
 * @param label - Label of the option
 * @param id - Id of the option
 * @param icon - Icon of the option
 */
export type AvatarMenuOption = {
  /**
   * Label of the option
   */
  label: string;
  /**
   * Id of the option
   */
  id?: string;
  /**
   * Icon of the option
   */
  icon?: ReactNode;
};

/**
 * Props of the AvatarMenu component
 * @param title - Title of the avatar menu
 * @param imageUrl - Image url of the avatar
 * @param options - Options of the avatar menu
 * @param onClickOption - Function to handle the click on an option
 */
export type AvatarMenuProps = {
  /**
   * Title of the avatar menu
   */
  title: string;
  /**
   * Image url of the avatar
   */
  imageUrl?: string;
  /**
   * Options of the avatar menu
   */
  options: AvatarMenuOption[];
  /**
   * Id of the avatar menu
   */
  id?: string;
  /**
   * Function to handle the click on an option
   */
  onClickOption: (option: AvatarMenuOption) => void;
  /**
   * Sx prop for the avatar menu
   */
  sx?: SxProps<Theme>;
} & BoxProps;
