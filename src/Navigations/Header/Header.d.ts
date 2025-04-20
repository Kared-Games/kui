import { ReactNode } from "react";
import { AvatarMenuOption } from "@/Avatars/AvatarMenu/AvatarMenu.d";

/**
 * Navigation option
 * @param name - Name of the navigation option
 * @param pathname - Pathname of the navigation option
 * @param icon - Icon of the navigation option
 */
export type NavOption = {
  /**
   * Name of the navigation option
   */
  name: string;
  /**
   * Pathname of the navigation option
   */
  pathname: string;
  /**
   * Icon of the navigation option
   */
  icon?: ReactNode;
};

/**
 * Props of the Header component
 * @param title - Title of the header
 * @param logoUrl - Url of the logo
 * @param show - Show the header
 * @param showBackButton - Show the back button
 * @param showHomeButton - Show the home button
 * @param navOptions - Navigation options
 * @param avatarTitle - Title of the avatar
 * @param avatarImageUrl - Image url of the avatar
 * @param avatarOptions - Avatar options
 * @param onClickHomeButton - Function to handle the click on the home button
 * @param onClickBackButton - Function to handle the click on the back button
 * @param onClickAvatarOption - Function to handle the click on an avatar option
 */
export type HeaderProps = {
  /**
   * Title of the header
   */
  title: string;
  /**
   * Url of the logo
   */
  logoUrl: string;
  /**
   * Show the header
   */
  show?: boolean;
  /**
   * Show the back button
   */
  showBackButton?: boolean;
  /**
   * Show the home button
   */
  showHomeButton?: boolean;
  /**
   * Navigation options
   */
  navOptions?: NavOption[];
  /**
   * Title of the avatar
   */
  avatarTitle?: string;
  /**
   * Image url of the avatar
   */
  avatarImageUrl?: string;
  /**
   * Avatar options
   */
  avatarOptions?: AvatarMenuOption[];
  /**
   * Function to handle the click on the home button
   */
  onClickHomeButton?: () => void;
  /**
   * Function to handle the click on the back button
   */
  onClickBackButton?: () => void;
  /**
   * Function to handle the click on an avatar option
   */
  onClickAvatarOption?: (option: AvatarMenuOption) => void;
};
