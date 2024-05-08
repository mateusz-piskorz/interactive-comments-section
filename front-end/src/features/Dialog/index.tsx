import { createPortal } from "react-dom";
import { FC } from "react";
import { Overlay, zIndex } from "../Overlay";
import c from "./Dialog.module.scss";
import Countdown from "react-countdown";

type DialogProps = {
  onCancel: () => void;
  description?: string;
  elapsedTime?: number;
  onConfirm?: () => void;
};

export const Dialog: FC<DialogProps> = ({
  onCancel,
  description,
  elapsedTime,
  onConfirm,
}) => {
  return createPortal(
    <>
      <div style={{ zIndex: zIndex + 1 }} className={c.Dialog}>
        <h2 className={c.Dialog_title}>Info</h2>
        <p className={c.Dialog_description}>{description}</p>
        {elapsedTime && <p>{countDown(elapsedTime)}</p>}
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

const countDown = (elapsedTime: number) => (
  <Countdown date={Date.now() + (60000 - elapsedTime)} />
);
