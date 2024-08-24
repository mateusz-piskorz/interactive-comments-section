import { FC } from "react";
import c from "./ProfileAvatar.module.scss";

export const availableAvatars = [
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
  "avatar6",
] as const;

type ProfileAvatarProps = {
  imgName: (typeof availableAvatars)[number];
};

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ imgName }) => {
  const srcImg = require(`../../assets/avatars/${imgName}.jpg`);
  return <img className={c.ProfileAvatar} src={srcImg} alt="profile avatar" />;
};
