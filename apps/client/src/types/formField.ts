import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errorMessage?: string;
}
