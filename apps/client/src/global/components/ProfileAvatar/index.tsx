/* eslint-disable @typescript-eslint/no-var-requires */

import { useQuery } from '@tanstack/react-query';
import c from './main.module.scss';
import { Avatar } from '@prisma/client';

type Props = {
  avatar: Avatar;
};

export const ProfileAvatar = ({ avatar }: Props) => {
  const { data } = useQuery({
    queryKey: ['importAvatar', avatar],
    queryFn: async () => await import(`@/assets/avatars/${avatar}.jpg`),
  });

  // todo: handle error, isLoading
  // console.log('ProfileAvatar:data');
  // console.log('ProfileAvatar:error');
  // console.log('ProfileAvatar:isLoading');

  return (
    <img className={c.ProfileAvatar} src={data?.default} alt="profile avatar" />
  );
};
