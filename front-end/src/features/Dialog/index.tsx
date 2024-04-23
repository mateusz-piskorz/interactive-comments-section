import { createPortal } from "react-dom";
import { FC } from "react";
import { Overlay, zIndex } from "../Overlay";
import c from "./Dialog.module.scss";
import Countdown from "react-countdown";
import { useAsyncFn } from "../../hooks/useAsync";
import { removeComment } from "../../services/comments";
import { useUser } from "../../context/user";

type DialogProps = {
  onCancel: () => void;
  description?: string;
  elapsedTime?: number;
  commentId?: string;
};

export const Dialog: FC<DialogProps> = ({
  onCancel,
  description = "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  elapsedTime,
  commentId,
}) => {
  const { user } = useUser();
  const { execute } = useAsyncFn(removeComment);

  const confirm = () => {
    if (commentId) {
      execute({ commentId, userId: user._id });
      onCancel();
    }
  };

  return createPortal(
    <>
      <div style={{ zIndex: zIndex + 1 }} className={c.Dialog}>
        <h2 className={c.Dialog_title}>Info</h2>
        <p className={c.Dialog_description}>{description}</p>
        {elapsedTime && <p>{countDown(elapsedTime)}</p>}
        <button onClick={onCancel} className={c.Dialog_button}>
          CANCEL
        </button>
        {commentId && (
          <button
            onClick={confirm}
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
