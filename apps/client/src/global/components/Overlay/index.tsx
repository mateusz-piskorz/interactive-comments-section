import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import c from './main.module.scss';

type Props = {
  onClick?: () => void;
};

export const zIndexOverlay = 99;

export const Overlay = ({ onClick }: Props) => {
  return createPortal(
    <div
      style={{ zIndex: zIndexOverlay }}
      className={clsx(c.Overlay, onClick && c.Overlay___cursorPointer)}
      onClick={onClick}
    />,
    document.body
  );
};
