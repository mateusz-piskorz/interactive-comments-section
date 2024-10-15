import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import c from './main.module.scss';
import { Overlay, zIndexOverlay } from '../Overlay';

export const CustomLoader = () => {
  return createPortal(
    <>
      <Overlay />
      <RemoveScroll forwardProps>
        <div
          style={{ zIndex: zIndexOverlay }}
          className={c.CustomLoader}
          aria-label="Loading..."
        ></div>
      </RemoveScroll>
    </>,
    document.body
  );
};
