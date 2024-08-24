import { createPortal } from "react-dom";
import { FC } from "react";
import { Overlay, zIndex } from "../Overlay";
import c from "./Dialog.module.scss";
import Countdown from "react-countdown";

type DialogProps = {
  onCancel: () => void;
  description?: string;
  remainingTime?: number;
  onConfirm?: () => void;
};

export const Dialog: FC<DialogProps> = ({
  onCancel,
  description,
  remainingTime,
  onConfirm,
}) => {
  return createPortal(
    <>
      <div style={{ zIndex: zIndex + 1 }} className={c.Dialog}>
        <h2 className={c.Dialog_title}>Info</h2>
        <p className={c.Dialog_description}>{description}</p>
        {remainingTime && (
          <p>
            <Countdown date={Date.now() + remainingTime} />
          </p>
        )}
        <button onClick={onCancel} className={c.Dialog_button}>
          CANCEL
        </button>
        {onConfirm && (
          <button
            onClick={onConfirm}
            className={`${c.Dialog_button} ${c.Dialog_button__danger}`}
          >
            CONFIRM
          </button>
        )}
      </div>
      <Overlay onClick={onCancel} />
    </>,
    document.body
  );
};
