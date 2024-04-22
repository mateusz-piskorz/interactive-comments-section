import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { toggleBodyOverflow } from "./utils";
import c from "./Overlay.module.scss";

type OverlayProps = {
  onClick?: () => void;
};

export const zIndex = 99;

export const Overlay: FC<OverlayProps> = ({ onClick }) => {
  useEffect(() => {
    toggleBodyOverflow("hidden");
    return () => {
      toggleBodyOverflow("visible");
    };
  }, []);

  const className = `${c.Overlay}${
    onClick ? ` ${c.Overlay___cursorPointer}` : ""
  }`;

  return createPortal(
    <div style={{ zIndex }} className={className} onClick={onClick} />,
    document.body
  );
};
