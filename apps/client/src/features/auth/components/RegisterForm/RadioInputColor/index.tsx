import { FieldProps } from '../../../types/formField';
import c from './main.module.scss';
import clsx from 'clsx';
import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import { Color } from '@prisma/client';

type Props = {
  displayedColor: Color;
  isSelected: boolean;
};

export const RadioInputColor = <T extends FieldValues>({
  displayedColor,
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
        value={displayedColor}
      />
      <label className={c.RadioInput_label} htmlFor={inputId}>
        <div
          style={{ backgroundColor: displayedColor }}
          className={c.RadioInput_colorCircle}
        />
      </label>
    </div>
  );
};
