import { useId } from 'react';
import clsx from 'clsx';
import { Avatar } from '@prisma/client';
import { FieldValues } from 'react-hook-form';
import { FieldProps } from '../../../types/formField';
import c from './main.module.scss';
import { ProfileAvatar } from '@/global/components/ProfileAvatar';

type Props = {
  displayedAvatar: Avatar;
  isSelected: boolean;
};

export const RadioInputAvatar = <T extends FieldValues>({
  displayedAvatar,
  isSelected,
  name,
  register,
}: FieldProps<T> & Props) => {
  const inputId = useId();
  return (
    <div className={clsx(c.RadioInput, isSelected && c.RadioInput___selected)}>
      <input
        {...register(name)}
        className={c.RadioInput_input}
        type="radio"
        id={inputId}
        value={displayedAvatar}
      />
      <label className={c.RadioInput_label} htmlFor={inputId}>
        <ProfileAvatar avatar={displayedAvatar} />
      </label>
    </div>
  );
};
