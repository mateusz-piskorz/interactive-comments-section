import { FC } from "react";
import { styled } from "styled-components";

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
  const srcImg = require(`../assets/avatars/${imgName}.jpg`);
  return <Img className="profile-avatar" src={srcImg} alt="profile avatar" />;
};

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
