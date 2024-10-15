/* eslint-disable react/jsx-no-useless-fragment */
import c from './main.module.scss';

type Props = {
  error: string | undefined;
};

export const ErrorText = ({ error }: Props) => {
  return error ? <span className={c.ErrorText}>{error}</span> : <></>;
};
